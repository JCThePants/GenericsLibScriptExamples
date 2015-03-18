/**
 * Display a message to a player from an NPC.
 *
 * @param player   The player to show the chat message to.
 * @param npcName  The name of the NPC.
 * @param message  The message.
 */
function npcTalk(player, npcName, message) {
    talkSession(player, function (talk) {
        talk.npc(4, npcName, message);
    });
}

/**
 * Displays a message to a player in chat that represents the
 * player speaking to an NPC.
 *
 * @param player   The player who is talking (and will see the message).
 * @param message  The message.
 */
function playerTalk(player, message) {
    talkSession(player, function (talk) {
        talk.player(4, message);
    });
}

/**
 * Get the chat prefix for an npc.
 *
 * @param npcName  The name of the npc.
 *
 * @returns {string}
 */
function getNpcPrefix(npcName) {
    return "{YELLOW}<" + npcName + "> {WHITE}";
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

    var players = isArray(player) ? player : [player];

    var totalDelay = (initialDelay || 0) * 20;
    var onFinish = null;
    var isFinished = false;

    var isPrimaryFinished = false;
    var secondaryCount = 0;

    var transcripts = [];
    var transcripters = [];
    var actionBars = [];

    var sessions = _questLib_internal.talkSessions;

    for (var i=0; i < players.length; i++) {

        var status = sessions.addStatus(players[i].getUniqueId());

        if (status.isTalking) {
            players.splice(i, 1);
            i--;
            continue;
        }

        transcripts[i] = new com.jcwhatever.nucleus.utils.text.dynamic.QueuedText();
        transcripters[i] = transcripts[i].getBuilder();

        status.isTalking = true;
    }

    function getEndTalkSession(playerIndex) {
        return function () {

            var player = players[playerIndex];
            var actionBar = actionBars[playerIndex];

            if (isPrimaryFinished) {
                secondaryCount--;

                if (secondaryCount != 0)
                    return;
            }

            if (!actionBar)
                return;

            actionBar.hide(player);
            actionBars[playerIndex] = null;
            var status = sessions.addStatus(player.getUniqueId());
            status.isTalking = false;

            isFinished = true;
            if (onFinish) {
                onFinish();
                onFinish = null;
            }
        }
    }


    if (players.length > 0) {


        // execute the provided callback and pass in an object
        // with utility functions
        var talk = {

            /**
             * NPC dialog.
             *
             * @param readTime  The amount of time it takes to read the dialog.
             * @param npcName   The name of the NPC talking.
             * @param dialog    The dialog to show in chat.
             */
            npc: function (readTime, npcName, dialog) {

                dialog = isArray(dialog) ? dialog : [dialog];

                for (var j = 0; j < dialog.length; j++) {
                    for (var i = 0; i < players.length; i++) {
                        transcripters[i].text(readTime * 20, getNpcPrefix(npcName) + dialog[j]);
                        if (isPrimaryFinished) {
                            transcripters[i].run(0, getEndTalkSession(i)).build();
                            secondaryCount++;
                        }
                    }
                    totalDelay += readTime * 20;
                }

                return talk;
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
            player: function (readTime, dialog) {

                dialog = isArray(dialog) ? dialog : [dialog];
                for (var j = 0; j < dialog.length; j++) {
                    for (var i = 0; i < players.length; i++) {
                        transcripters[i].text(readTime * 20, getPlayerPrefix(players[i]) + dialog[j]);
                        if (isPrimaryFinished) {
                            transcripters[i].run(0, getEndTalkSession(i)).build();
                            secondaryCount++;
                        }
                    }
                    totalDelay += readTime * 20;
                }

                return talk;
            },

            /**
             * Adds time to the total session, allowing the session to last
             * longer than the calculated time without inserting a pause.
             *
             * <p>Does not work outside inside embedded functions called
             * within the callback.</p>
             *
             * @param time  The time to add
             */
            padTime: function (time) {
                totalDelay += time * 20;

                return talk;
            },

            /**
             * Pause the talk sessions for the specified amount of time.
             *
             * @param time  The amount of time to pause
             */
            pause: function (time) {
                for (var i = 0; i < players.length; i++) {
                    transcripters[i].pause(time * 20);
                    if (isPrimaryFinished) {
                        transcripters[i].run(0, getEndTalkSession(i)).build();
                        secondaryCount++;
                    }
                }
                totalDelay += time * 20;
                if (isPrimaryFinished) {
                    totalDelay += 1;
                }
                return talk;
            },

            /**
             * Prematurely end the talk session. Call
             * from within a function that is run in
             * the talk session to cancel the rest of
             * the dialog.
             */
            end: function () {

                for (var i = 0; i < players.length; i++) {
                    secondaryCount++;
                    transcripters[i].run(0, getEndTalkSession(i)).build();
                }
                return talk;
            },

            /**
             * Clear the players action bar text
             */
            clear : function() {
                for (var i = 0; i < players.length; i++) {
                    transcripters[i].text(1, "");
                }
                return talk;
            },

            /**
             * Execute a function. Executes a function in sequence "Async".
             *
             * @param callback  The parameterless function to execute.
             */
            execute: function (callback) {
                for (var i = 0; i < players.length; i++) {
                    transcripters[i].run(5, callback);
                    if (isPrimaryFinished) {
                        transcripters[i].run(0, getEndTalkSession(i)).build();
                        secondaryCount++;
                    }
                }
                totalDelay += 5;
                return talk;
            }
        };

        callback(talk);
    }

    isPrimaryFinished = true;

    function end() {
        for (var i = 0; i < players.length; i++) {
            secondaryCount++;
            getEndTalkSession(i)();
        }
    }

    var result = {
        totalDelay : totalDelay,
        onFinish : function (callback) {
            if (isFinished) {
                callback();
            }
            else {
                onFinish = callback;
            }
        },
        cancel : function () {
            end();
        }
    };



    for (var i=0; i < players.length; i++) {
        var p = players[i];

        actionBars[i] = actionbars.createPersistent(transcripts[i]);
        actionBars[i].show(p);
        transcripters[i].build();
    }

    if (players.length > 0) {
        // on finish
        scheduler.runTaskLater(totalDelay + 15, function () {
            end();
        });
    }

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




