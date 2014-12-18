/**
 * Display a message to a player from an NPC.
 *
 * @param player   The player to show the chat message to.
 * @param npcName  The name of the NPC.
 * @param message  The message.
 * @param canSpam  Optional. Specify if spamming allowed. Default is false.
 */
function npcTalk(player, npcName, message, canSpam) {

    message = getNpcPrefix(npcName) + message;

    if (canSpam) {
        msg.tell(player, message);
    }
    else {
        msg.tellNoSpam(player, 10 * 20, message);
    }
}

/**
 * Displays a message to a player in chat that represents the
 * player speaking to an NPC.
 *
 * @param player   The player who is talking (and will see the message).
 * @param message  The message.
 * @param canSpam  Optional. Specify if spamming allowed. Default is false.
 */
function playerTalk(player, message, canSpam) {

    message = getPlayerPrefix(player) + message;

    if (canSpam) {
        msg.tell(player, message);
    }
    else {
        msg.tellNoSpam(player, 10 * 20, message);
    }
}

/**
 * Get the chat prefix for an npc.
 *
 * @param npcName  The name of the npc.
 *
 * @returns {string}
 */
function getNpcPrefix(npcName) {
    return "{YELLOW}<{WHITE}" + npcName + "{YELLOW}> {GRAY}";
}

/**
 * Get the chat prefix for a player speaking to an npc.
 *
 * @param player  The player
 *
 * @returns {string}
 */
function getPlayerPrefix(player) {
    return "{BLUE}<{WHITE}" + player.getName() + "{BLUE}> {GOLD}";
}

/**
 * Start a talk session. Designed to make it easy to script timed dialog and actions.
 *
 * @param player        The player the session is for.
 * @param callback      The callback to run. An object containing utilities is passed into the callback.
 * @param initialDelay  Optional initial delay before starting.
 *
 * @returns {{totalDelay: number, onFinish: Function}}
 */
function talkSession(player, callback, initialDelay) {

    var totalDelay = (initialDelay || 0) * 20;
    var totalTasks = 0;
    var executedTasks = 0;

    var sessions = _questLib_internal.talkSessions;
    var status = sessions.addStatus(player.getUniqueId());
    var onFinish = null;
    var isFinished = false;

    status.isTalking = true;

    // increment the number of tasks executed and
    // end session if all tasks completed.
    function incrementExecuted() {
        executedTasks++;
        if (executedTasks >= totalTasks) {
            if (onFinish) {
                onFinish();
            }
            status.isTalking = false;
            isFinished = true;
        }
    }

    // utility to display timed chat dialog.
    function displayDialog(readTime, dialog) {
        var isFinished = false;
        var isStarted = false;
        var onFinish;
        var onStart;

        if (totalDelay == 0) {
            msg.tell(player, dialog);
            isStarted = true;
            scheduler.runTaskLater(readTime * 20, function () {
                isFinished = true;
                if (onFinish) {
                    onFinish();
                }
                incrementExecuted();
            })
        }
        else {
            scheduler.runTaskLater(totalDelay, function () {
                isStarted = true;
                msg.tell(player, dialog);

                if (onStart) {
                    onStart();
                }

                scheduler.runTaskLater(readTime * 20, function () {
                    isFinished = true;
                    if (onFinish) {
                        onFinish();
                    }
                    incrementExecuted();
                });
            });
        }

        totalDelay += readTime * 20;

        return {
            onStart : function (callback) {
                if (isStarted) {
                    callback();
                }
                else {
                    onStart = callback;
                }
            },
            onFinish : function (callback) {
                if (isFinished) {
                    callback();
                } else {
                    onFinish = callback;
                }

            }
        }
    }

    // execute the provided callback and pass in an object
    // with utility functions
    callback({

        /**
         * NPC dialog.
         *
         * @param readTime  The amount of time it takes to read the dialog.
         * @param npcName   The name of the NPC talking.
         * @param dialog    The dialog to show in chat.
         *
         * @returns {{ onStart : Function, onFinish : Function  }}
         * Object with methods to attach onStart and onFinish callbacks.
         */
        npc : function (readTime, npcName, dialog) {

            dialog = getNpcPrefix(npcName) + dialog;
            totalTasks++;

            return displayDialog(readTime, dialog);

        },

        /**
         * Player dialog.
         *
         * @param readTime  The amount of time it takes to read the dialog.
         * @param dialog    The dialog to show in chat.
         *
         * @returns {{ onStart : Function, onFinish : Function  }}
         * Object with methods to attach onStart and onFinish callbacks.
         */
        player : function (readTime, dialog) {
            dialog = getPlayerPrefix(player) + dialog;
            totalTasks++;

            return displayDialog(readTime, dialog);
        },

        /**
         * Adds time to the session "Async", that is, the time added does not compete
         * with the dialog or execution of the session, but simply extends the minimum
         * time of the session.
         *
         * @param time  The time to add
         */
        padTime : function (time) {
            totalTasks++;
            scheduler.runTaskLater(totalDelay + (time * 20), function () {
                incrementExecuted();
            });
        },

        /**
         * Execute a function. Executes a function in sequence "Async".
         *
         * @param callback  The parameterless function to execute.
         */
        execute : function (callback) {
            totalTasks++;
            scheduler.runTaskLater(totalDelay, function () {
                callback();
                incrementExecuted();
            });
        }
    });

    var result = {
        totalDelay : totalDelay,
        onFinish : function (callback) {
            if (isFinished) {
                callback();
            }
            else {
                onFinish = callback;
            }
        }
    };

    // reset total delay in case more talk is added
    // inside a callback function.
    totalDelay = 0;

    return result;
}

/**
 * Determine if a player is currently in a talk session.
 *
 * @param player  The player to check.
 *
 * @returns {boolean}
 */
function isTalking(player) {
    var sessions = _questLib_internal.talkSessions;

    var status = sessions.addStatus(player.getUniqueId());

    return status.isTalking === true;
}


// TODO: Is this really needed
var _dialog = (function () {

    var npcTalkTracker = new StatusTracker();

    function getNPCDialog(npc, player, responses) {
        var status = npcTalkTracker.addStatus(player.getUniqueId());

        if (!status.dialogs) {
            status.dialogs = new JSMap();
        }

        var dialog = status.dialogs.get(npc);
        if (!dialog) {
            dialog = arrayPick(responses);
            status.dialogs.put(npc, dialog);
        }
        else {
            return "You said that already.";
        }

        return dialog;
    }

    function showResponse(npc, player, dialog) {

        if (isString(dialog)) {
            talkSession(player, function (talk) {
                talk.npc(0, npc.getName(), m);
            }, 2);
        }
        else {
            talkSession(player, function (talk) {
                for (var i = 0; i < dialog.length; i++) {
                    var m = dialog[i];
                    talk.npc(i < dialog.length - 1 ? 3 : 0, npc.getName(), m);
                }
            }, 2);
        }
    }

    return {

        npcRespondOnce : function (npc, player, responses) {
            var dialog = getNPCDialog(npc, player, responses);

            showResponse(npc, player, dialog);
        },

        npcRespond : function (npc, player, responses) {
            var dialog = arrayPick(responses);

            showResponse(npc, player, dialog);
        },

        clearResponses : function (player) {
            npcTalkTracker.removeStatus(player);
        }

    };
}());



