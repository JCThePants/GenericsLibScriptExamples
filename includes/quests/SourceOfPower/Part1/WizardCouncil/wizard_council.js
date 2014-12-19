(function () {

    quests.regions.onEnter(_regions.wizardCouncil.QUEUE_TO_SPEAK, function (player, region) {

        // make sure player is supposed to talk to the council
        if (!isTaskComplete(player, _tasks.tellTheKing.PICKUP_ORDERS) ||
            isTaskComplete(player, _tasks.wizardCouncil.ACCEPT_PART2)) {
            return false;
        }

        if (isTalking(player))
            return;

        wizardCouncil.talkSession(player, function (talk) {

            talk.player(2, "I Bring Orders from the King.");
            talk.player(2, "I found a doorway beneath the volcano.");
            talk.player(3, "Behind it there are zombies.");

            talk.member2(2, "Zombies!" );

            talk.member3(5, "This could mean the portal to the other realm is now damaging ours.");

            talk.member6(4, "If Arboria falls we are all doomed.");

            talk.player(2, "I don't understand.");
            talk.player(3, "Can't we just go to another realm?");

            talk.member4(5, "The volcano is what powers the portal.");
            talk.member4(5, "The portal slowly destroys the realm it's linked to.");
            talk.member4(7, "Even if the portal is shut off, the damage is already done and continues to get worse.");
            talk.member4(6, "That's why we sometimes have to link the portal to a new realm.");
            talk.member4(7, "If the realm of Arboria is being damaged as well, we'll have nowhere to go that is safe.");
            talk.member4(8, "Arboria will be destroyed and any realm we evacuate to will be destroyed as well.");

            talk.member5(8, "These orders say we've been given full authority to decide on a course of action.");

            talk.member4(5, "What else did you see behind that door?");

            talk.player(5, "Not much besides another much larger door.");

            talk.member2(6, "We need to know more before we can decide on a course of action.");

            talk.member3(7, "Maybe this is related to the reason the volcano's magic output is decreasing.");

            talk.member6(6, "We should send someone to investigate.");

            talk.playerLook();

            talk.padTime(30); // give time for player to accept the next quest

            talk.execute(function () {

                if (isCurrentQuest(player, _quests.SOURCE_OF_POWER_1.name)) {
                    msg.tell(player, "{GREEN}" + _quests.SOURCE_OF_POWER_1.display + " quest completed.");

                    // quest completed (Source of Power Part 1)
                    completeQuest(player, _quests.SOURCE_OF_POWER_1.name);
                }

                // query for next quest (Source of Power Part 2)
                quests.queryQuest(player, _quests.SOURCE_OF_POWER_2.name, function () {

                    msg.tell(player, "{GREEN}" + _quests.SOURCE_OF_POWER_2.display + " quest accepted.");

                    completeTask(player, _tasks.wizardCouncil.ACCEPT_PART2);

                    talk.player(3, "I'll do it.");

                    talk.member1(5, "I don't know if you know anything about the ancient civilization of Sybaria...");
                    talk.member1(4, "But I suspect those doorways are remnants of their civilization.");
                    talk.member1(5, "I suspect they also built the portal, maybe even the volcano.");

                    talk.member3(3, "Here we go again.");
                    talk.member3(5, "How could anyone build a volcano.");

                    talk.member1(5, "If you run across any strange doorways, they might be soul doors.");
                    talk.member1(7, "Soul doors are doors the ancient Sybarian civilization used that could recognize " +
                    "the soul of a person and allow passage.");
                    talk.member1(5, "Ancient writings speak of keys that you must use to make the door recognize you...");
                    talk.member1(7, "but there's not much more information than that.");

                    talk.member5(5, "Quit telling those children stories. {GREEN}There's work to be done.");

                    talk.playerLook();

                    talk.padTime(3);
                });
            });

        });

    });

}());