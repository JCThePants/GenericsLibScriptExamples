var wizardCouncil = (function () {

    var npcInfo = [
        _global.character.WIZARD_COUNCIL_MEMBER_1,
        _global.character.WIZARD_COUNCIL_MEMBER_2,
        _global.character.WIZARD_COUNCIL_MEMBER_3,
        _global.character.WIZARD_COUNCIL_MEMBER_4,
        _global.character.WIZARD_COUNCIL_MEMBER_5,
        _global.character.WIZARD_COUNCIL_MEMBER_6,
        _global.character.WIZARD_COUNCIL_MEMBER_7
    ];

    var npcLocation = [
        quests.locations.get("WizardCouncil1"),
        quests.locations.get("WizardCouncil2"),
        quests.locations.get("WizardCouncil3"),
        quests.locations.get("WizardCouncil4"),
        quests.locations.get("WizardCouncil5"),
        quests.locations.get("WizardCouncil6"),
        quests.locations.get("WizardCouncil7")
    ];

    var nodTasks = [
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];

    function generateNPC(info, location) {
        var npc = citizens.createNPC(info.name, info.type);
        npc.setSkinName(info.skin);
        npc.spawn(location);
        npc.addTrait(citizensUtils.traits.LOOKING);
        return npc;
    }

    for (var i=0; i < npcInfo.length; i++) {
        _global.npc["WIZARD_COUNCIL_MEMBER_" + (i + 1)] = generateNPC(npcInfo[i], npcLocation[i]);
    }

    var talkQueue = [];
    var current = null;
    var isInTalkSession = false;
    var enterLocation = quests.locations.get("WizardCouncilEnter");
    var exitLocation = quests.locations.get("WizardCouncilExit");

    function nod(player, memberIndex, durationSeconds) {

        var npc = _global.npc["WIZARD_COUNCIL_MEMBER_" + memberIndex];
        var lookingTrait = npc.getTrait(citizensUtils.traits.LOOKING);

        if (nodTasks[memberIndex - 1] != null) {
            nodTasks[memberIndex - 1].cancel();
        }

        nodTasks[memberIndex - 1] = scheduler.runTaskLater(durationSeconds * 20, function () {
            if (lookingTrait.getLookMode().name().equals("TALK_ENTITY")) {
                lookingTrait.setEnabled(false);
            }
            nodTasks[memberIndex - 1] = null;
        });

        lookingTrait.setLookEntity(player);
        lookingTrait.setLookMode("TALK_ENTITY");
        lookingTrait.setEnabled(true);

        for (var i=1; i <= npcInfo.length; i++) {
            if (i == memberIndex)
                continue;

            look(i, npc.getEntity());
        }
    }

    function look(memberIndex, entity) {
        var npc = _global.npc["WIZARD_COUNCIL_MEMBER_" + memberIndex];
        var lookingTrait = npc.getTrait(citizensUtils.traits.LOOKING);

        if (entity == null) {
            lookingTrait.setEnabled(false);
        }
        else {
            lookingTrait.setLookEntity(entity);
            lookingTrait.setLookMode("LOOK_ENTITY");
            lookingTrait.setEnabled(true);
        }
    }

    function startCurrent() {
        if (current == null || isInTalkSession)
            return;

        isInTalkSession = true;

        var player = current.player;

        var result = talkSession(current.player, function (talk) {

            current.callback({
                member1 : function (readTime, dialog) {
                    talk.npc(readTime, "Council Member", dialog)
                        .onStart(function () {
                            nod(player, 1, readTime);
                        });
                },

                member2 : function (readTime, dialog) {
                    talk.npc(readTime, "Council Member", dialog)
                        .onStart(function () {
                            nod(player, 2, readTime);
                        });
                },

                member3 : function (readTime, dialog) {
                    talk.npc(readTime, "Council Member", dialog)
                        .onStart(function () {
                            nod(player, 3, readTime);
                        });
                },

                member4 : function (readTime, dialog) {
                    talk.npc(readTime, "Council Member", dialog)
                        .onStart(function () {
                            nod(player, 4, readTime);
                        });
                },

                member5 : function (readTime, dialog) {
                    talk.npc(readTime, "Council Member", dialog)
                        .onStart(function () {
                            nod(player, 5, readTime);
                        });
                },

                member6 : function (readTime, dialog) {
                    talk.npc(readTime, "Council Member", dialog)
                        .onStart(function () {
                            nod(player, 6, readTime);
                        });
                },

                member7 : function (readTime, dialog) {
                    talk.npc(readTime, "Council Member", dialog)
                        .onStart(function () {
                            nod(player, 7, readTime);
                        });
                },

                player : function (readTime, dialog) {
                    talk.player(readTime, dialog).onStart(function () {
                            for (var i=1; i <= npcInfo.length; i++) {
                                look(i, player);
                            }
                        });

                },

                execute : function (callback) {
                    talk.execute(callback);
                },

                padTime : function (time) {
                    talk.padTime(time);
                },

                playerLook : function () {
                    talk.execute(function() {
                        for (var i=1; i <= npcInfo.length; i++) {
                            look(i, player);
                        }
                    });
                }

            });

        });

        result.onFinish(function () {

            for (var i=1; i <= npcInfo.length; i++) {
                if (i != 4) {
                    look(i, _global.npc.WIZARD_COUNCIL_MEMBER_4.getEntity());
                }
            }

            if (current.onFinish) {
                result.onFinish(current.onFinish);
            }

            endSession();
        });

    }

    function endSession() {
        current.player.teleport(exitLocation);
        current = null;
        isInTalkSession = false;

        nextTalk();
    }

    function nextTalk() {

        if (talkQueue.length == 0 || current != null)
            return;

        current = talkQueue.splice(0, 1)[0];

        current.player.teleport(enterLocation);

        // kick player if they do no talk to the council
        scheduler.runTaskLater(20 * 20, function () {

            if (!isInTalkSession) {
                endSession();
            }
        });

        return current;
    }

    function registerTalk(player, callback) {

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

    function unregisterTalk(player) {
        for (var i=0; i < talkQueue.length; i++) {
            if (talkQueue[i].player.getUniqueId().equals(player.getUniqueId())) {
                return talkQueue.splice(i, 1)[0];
            }
        }
        return null;
    }

    quests.regions.onEnter("SoP_WizardCouncilTalk", function (player, region) {

        scheduler.runTaskLater(1, function () {
            if (current == null && nextTalk() == null) {
                return;
            }

            if (current.player.getUniqueId().equals(player.getUniqueId())) {
                startCurrent();
            }
        });
    });

    quests.regions.onLeave("WizardCouncilWaitingRoom", function (player, region) {
        var queueSession = unregisterTalk(player);

        if (queueSession) {
            msg.tell(player, "You have left the queue to see the Council of Wizards.");
        }
    });

    return {

        talkSession : function (player, callback) {
            return registerTalk(player, callback);
        },

        endTalkSession: function(player) {
            unregisterTalk(player);
        }
    };

}());
