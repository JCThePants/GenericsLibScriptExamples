var wizardCouncil = (function () {

    // local array of wizard council NPC's
    var npcInfo = [
        _global.character.WIZARD_COUNCIL_MEMBER_1,
        _global.character.WIZARD_COUNCIL_MEMBER_2,
        _global.character.WIZARD_COUNCIL_MEMBER_3,
        _global.character.WIZARD_COUNCIL_MEMBER_4,
        _global.character.WIZARD_COUNCIL_MEMBER_5,
        _global.character.WIZARD_COUNCIL_MEMBER_6,
        _global.character.WIZARD_COUNCIL_MEMBER_7
    ];

    // array of wizard council NPC locations
    var npcLocation = [
        quests.locations.get(_locations.wizardCouncil.NPC_MEMBER_1),
        quests.locations.get(_locations.wizardCouncil.NPC_MEMBER_2),
        quests.locations.get(_locations.wizardCouncil.NPC_MEMBER_3),
        quests.locations.get(_locations.wizardCouncil.NPC_MEMBER_4),
        quests.locations.get(_locations.wizardCouncil.NPC_MEMBER_5),
        quests.locations.get(_locations.wizardCouncil.NPC_MEMBER_6),
        quests.locations.get(_locations.wizardCouncil.NPC_MEMBER_7)
    ];

    // array to track scheduled head nodding tasks
    var nodTasks = [
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];

    // generate a council member NPC
    function generateNPC(info, location) {
        var npc = npcs.create(info.uname, info.name, info.type);

        npc.getTraits()
            .invulnerable()
            .setSkinName(info.skin);

        npc.getTraits().add("NpcTraitPack:Looking");
        npc.spawn(location);

        return npc;
    }

    for (var i=0; i < npcInfo.length; i++) {
        _global.npc["WIZARD_COUNCIL_MEMBER_" + (i + 1)] = generateNPC(npcInfo[i], npcLocation[i]);
    }

    var talkQueue = [];
    var current = null;
    var isInTalkSession = false;
    var enterLocation = quests.locations.get(_locations.wizardCouncil.ENTER);
    var exitLocation = quests.locations.get(_locations.wizardCouncil.EXIT);


    _global.npc.WIZARD_COUNCIL_MEMBER_7.getTraits()
        .get("NpcTraitPack:Looking")
        .stop();

    /**
     * Detect player approaching council to speak
     */
    quests.regions.onEnter(_regions.wizardCouncil.SPEAK, function (player, region) {

        scheduler.runTaskLater(1, function () {
            if (current == null && nextTalk() == null) {
                return;
            }

            if (isSessionPlayer(player)) {
                startCurrent();
            }
        });
    });

    /**
     * Detect player leaving queue waiting room
     */
    quests.regions.onLeave(_regions.wizardCouncil.WAITING_ROOM, function (player, region) {

        if (isSessionPlayer(player)) {
            endSession();
        }
        else {

            var queueSession = unregisterTalk(player);
            if (queueSession) {
                msg.tell(player, "You have left the queue to see the Council of Wizards.");
            }
        }
    });

    /**
     * Determine if a player is the player currently talking to the council
     */
    function isSessionPlayer(player) {
        if (!current)
            return false;

        return current.player.getUniqueId().equals(player.getUniqueId());
    }

    // simulate head nodding while talking for the specified duration
    function nod(player, memberIndex, durationSeconds) {

        var npc = _global.npc["WIZARD_COUNCIL_MEMBER_" + memberIndex];

        if (npc.getNavigator().isRunning()) {
            return;
        }

        var lookingTrait = npc.getTraits().get("NpcTraitPack:Looking");

        if (nodTasks[memberIndex - 1] != null) {
            nodTasks[memberIndex - 1].cancel();
        }

        nodTasks[memberIndex - 1] = scheduler.runTaskLater(durationSeconds * 20, function () {
            if (lookingTrait.isTalkNod()) {
                lookingTrait
                    .setTalkNod(false);

            }
            nodTasks[memberIndex - 1] = null;
        });

        lookingTrait
            .setTalkNod(true)
            .lookEntity(player);

        for (var i=1; i <= npcInfo.length; i++) {
            if (i == memberIndex)
                continue;

            look(i, npc.getEntity());
        }
    }

    // make the npc look at the specified entity
    function look(memberIndex, entity) {
        var npc = _global.npc["WIZARD_COUNCIL_MEMBER_" + memberIndex];
        var lookingTrait = npc.getTraits().add("NpcTraitPack:Looking");

        if (npc.getNavigator().isRunning()) {
            return;
        }

        if (entity == null) {
            lookingTrait.stop();
        }
        else {
            lookingTrait
                .setTalkNod(false)
                .lookEntity(entity);
        }
    }

    // start the current talk session with the council members
    function startCurrent() {
        if (current == null || isInTalkSession)
            return;

        isInTalkSession = true;

        var player = current.player;

        var result = talkSession(player, function (talk) {

            // run talk session callback and provide methods to create dialog
            // between the player and council NPC's
            var councilTalk = {
                member1 : function (readTime, dialog) {
                    talk.execute(function () {
                        nod(player, 1, readTime);
                    });
                    talk.npc(readTime, "Council Member", dialog);
                    return councilTalk;
                },

                member2 : function (readTime, dialog) {
                    talk.execute(function () {
                        nod(player, 2, readTime);
                    });
                    talk.npc(readTime, "Council Member", dialog);
                    return councilTalk;
                },

                member3 : function (readTime, dialog) {
                    talk.execute(function () {
                        nod(player, 3, readTime);
                    });
                    talk.npc(readTime, "Council Member", dialog);
                    return councilTalk;
                },

                member4 : function (readTime, dialog) {
                    talk.execute(function () {
                        nod(player, 4, readTime);
                    });
                    talk.npc(readTime, "Council Member", dialog);
                    return councilTalk;
                },

                member5 : function (readTime, dialog) {
                    talk.execute(function () {
                        nod(player, 5, readTime);
                    });
                    talk.npc(readTime, "Council Member", dialog);
                    return councilTalk;
                },

                member6 : function (readTime, dialog) {
                    talk.execute(function () {
                        nod(player, 6, readTime);
                    });
                    talk.npc(readTime, "Council Member", dialog);
                    return councilTalk;
                },

                member7 : function (readTime, dialog) {
                    talk.execute(function () {
                        nod(player, 7, readTime);
                    });
                    talk.npc(readTime, "Council Member", dialog);
                    return councilTalk;
                },

                player : function (readTime, dialog) {
                    talk.execute(function () {
                        for (var i=1; i <= npcInfo.length; i++) {
                            look(i, player);
                        }
                    });
                    talk.player(readTime, dialog);
                    return councilTalk;
                },

                execute : function (callback) {
                    talk.execute(callback);
                    return councilTalk;
                },

                padTime : function (time) {
                    talk.padTime(time);
                    return councilTalk;
                },

                pause : function (time) {
                    talk.pause(time);
                    return councilTalk;
                },

                end : function() {
                    talk.end();
                    return councilTalk;
                },

                playerLook : function () {
                    talk.execute(function() {
                        for (var i=1; i <= npcInfo.length; i++) {
                            look(i, player);
                        }
                    });
                    return councilTalk;
                }
            };

            current.callback(councilTalk);

        });

        var onFin = current.onFinish;
        current.session = result;
        current.session.onFinish(function () {

            for (var i=1; i <= npcInfo.length; i++) {
                if (i != 4) {
                    look(i, _global.npc.WIZARD_COUNCIL_MEMBER_4.getEntity());
                }
            }

            if (onFin) {
                result.onFinish(onFin);
            }

            endSession();
        });

    }

    // end the current session with the council
    function endSession(suppressTeleport) {

        if (current == null || !isInTalkSession)
            return;

        if (suppressTeleport !== true) {
            current.player.teleport(exitLocation);
        }
        isInTalkSession = false;
        current.session.cancel();
        current = null;

        nextTalk();
    }

    // attempt to start a session with the next player in the
    // queue.
    function nextTalk() {

        if (talkQueue.length == 0 || current != null)
            return;

        current = talkQueue.splice(0, 1)[0];

        current.player.teleport(enterLocation);

        // kick player if they do no talk to the council
        preventQueueBlocking(current.player);

        return current;
    }

    // player needs to initiate talk with council within
    // 20 seconds or get kicked from the council chambers.
    function preventQueueBlocking(player) {
        scheduler.runTaskLater(20 * 20, function () {
            if (!current)
                return;

            if (current.player != player)
                return;

            if (!isInTalkSession) {
                endSession();
            }
        });
    }

    // register a talk session to add to the queue, or starts
    // immediately if no one else is in a talk session with the council or queued
    function registerTalk(player, callback) {

        if (current && current.player.getUniqueId().equals(player.getUniqueId())) {
            return null;
        }

        var session = {
            player : player,
            callback : callback,
            onFinish : null
        };

        var result = {
            onFinish : function (callback) {
                session.onFinish = callback;
            }
        };

        if (talkQueue.length == 0 && current == null) {
            current = session;
            player.teleport(enterLocation);
            preventQueueBlocking(player);
            return result;
        }

        for (var i=0; i < talkQueue.length; i++) {
            if (talkQueue[i].player.getUniqueId().equals(player.getUniqueId())) {
                talkQueue[i] = session;
                return result;
            }
        }

        talkQueue.push(session);

        msg.tell(player, "You have entered the queue to speak with the council of wizards. " +
                         "Do not leave the room or you will lose your place in the queue.");


        return result;
    }

    // unregister/cancel a pending talk session
    function unregisterTalk(player) {
        for (var i=0; i < talkQueue.length; i++) {
            if (talkQueue[i].player.getUniqueId().equals(player.getUniqueId())) {
                return talkQueue.splice(i, 1)[0];
            }
        }
        return null;
    }

    return {

        talkSession : function (player, callback) {
            return registerTalk(player, callback);
        },

        endTalkSession: function(player) {
            unregisterTalk(player);
        }
    };

}());
