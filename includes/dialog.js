// depends on StatusTracker in status_tracker.js
// depends on arrayPick in global_utils.js
// depends on JSMap in global_utils.js
// depends on talkSession in global_utils.js

function npcTalk(player, delaySeconds, npcName, message) {

    if (isString(delaySeconds)) {
        message = npcName;
        npcName = delaySeconds;
        delaySeconds = 0;
    }

    message = "{YELLOW}<{WHITE}" + npcName + "{YELLOW}> {GRAY}" + message;

    if (!delaySeconds) {
        msg.tellNoSpam(player, 10, message);
    }
    else {
        scheduler.runTaskLater(delaySeconds * 20, function () {
            msg.tellNoSpam(player, 10, message);
        })
    }
}

function playerTalk(player, delaySeconds, message) {

    if (isString(delaySeconds)) {
        message = delaySeconds;
        delaySeconds = 0;
    }

    message = "{BLUE}<{WHITE}" + player.getName() + "{BLUE}> {GOLD}" + message;

    if (!delaySeconds) {
        msg.tellNoSpam(player, 10, message);
    }
    else {
        scheduler.runTaskLater(delaySeconds * 20, function () {
            msg.tellNoSpam(player, 10, message);
        })
    }
}

function talkSession(player, callback, initialDelay) {

    var totalDelay = (initialDelay || 0) * 20;
    var totalTasks = 0;
    var executedTasks = 0;

    var sessions = _questLib_internal.talkSessions;
    var status = sessions.addStatus(player.getUniqueId());
    var onFinish = null;
    var isFinished = false;

    status.isTalking = true;

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

    callback({

        npc : function (readTime, npcName, dialog) {

            dialog = "{YELLOW}<{WHITE}" + npcName + "{YELLOW}> {GRAY}" + dialog;
            totalTasks++;

            return displayDialog(readTime, dialog);

        },

        player : function (readTime, dialog) {
            dialog = "{BLUE}<{WHITE}" + player.getName() + "{BLUE}> {GOLD}" + dialog;
            totalTasks++;

            return displayDialog(readTime, dialog);
        },

        padTime : function (time) {
            totalTasks++;
            scheduler.runTaskLater(totalDelay + (time * 20), function () {
                incrementExecuted();
            });
        },

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

    // reset total delay in case more talk is added.
    totalDelay = 0;

    return result;
}

function isTalking(player) {
    var sessions = _questLib_internal.talkSessions;

    var status = sessions.addStatus(player.getUniqueId());

    return status.isTalking === true;
}

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



