(function () {

    quests.regions.onEnter(_regions.wizardCouncil.QUEUE_TO_SPEAK, function (player, region) {

        // make sure player is supposed to talk to the council
        if (isTaskComplete(player, _tasks.wizardCouncil.ACCEPT_PART2) ||
            !isTaskComplete(player, _tasks.tellTheKing.PICKUP_ORDERS)) {
            return false;
        }

        if (isTalking(player))
            return;

        wizardCouncil.talkSession(player, function (talk) {

            talk
                .player(2, "I Bring Orders from the King.")
                .player(2, "I found a doorway beneath the volcano.")
                .player(3, "Behind it there are zombies.")

                .member2(2, "Zombies!" )

                .member3(5, "This could mean the portal to the other realm is now damaging ours.")

                .member6(4, "If Arboria falls we are all doomed.")

                .player(2, "I don't understand.")
                .player(3, "Can't we just go to another realm?")

                .member4(5, "The volcano is what powers the portal.")
                .member4(5, "The portal slowly destroys the realm it's linked to.")
                .member4(4, "Even if the portal is shut off..")
                .member4(5, "...the damage is already done and continues to get worse.")
                .member4(6, "That's why we sometimes have to link the portal to a new realm.")
                .member4(5, "If the realm of Arboria is being damaged as well...")
                .member4(5, "...we'll have nowhere to go that is safe.")
                .member4(5, "Any realm we evacuate to will be destroyed as well.")

                .member5(6, "These orders say we've been given full authority.")

                .member4(5, "What else did you see behind that door?")

                .player(5, "Not much besides another much larger door.")

                .member2(6, "We need to know more before we can decide on a course of action.")

                .member3(7, "Maybe this is related to the reason the volcano's magic output is decreasing.")

                .member6(6, "We should send someone to investigate.")

                .playerLook()

                .execute(function () {

                    if (isCurrentQuest(player, _quests.SOURCE_OF_POWER.PART_1.quest)) {
                        msg.tell(player, "{GREEN}" + _quests.SOURCE_OF_POWER.PART_1.display + " quest completed.");

                        _titles.SOURCE_OF_POWER_1_COMPLETE.showTo(player);

                        // quest completed (Source of Power Part 1)
                        completeQuest(player, _quests.SOURCE_OF_POWER.PART_1.quest);

                        setObjective(player, _quests.SOURCE_OF_POWER.quest, "PART2",
                            "Accept part 2 of the quest from the Council of Wizards.");
                    }

                    // query for next quest (Source of Power Part 2)
                    queryQuest(player, _quests.SOURCE_OF_POWER.PART_2.quest, function () {

                        msg.tell(player, "{GREEN}" + _quests.SOURCE_OF_POWER.PART_2.display + " quest accepted.");

                        _titles.SOURCE_OF_POWER_2_ACCEPT.showTo(player);

                        completeTask(player, _tasks.wizardCouncil.ACCEPT_PART2);

                        clearObjective(player, _quests.SOURCE_OF_POWER.quest);

                        setObjective(player, _quests.SOURCE_OF_POWER.PART_2.quest, "VOLCANO_RETURN",
                            "Re-enter the doorway beneath the volcano and explore beyond the large doorway.");

                        talk
                            .player(3, "I'll do it.")

                            .member1(5, "I don't know if you know anything about the ancient civilization of Sybaria...")
                            .member1(4, "But I suspect those doorways are remnants of their civilization.")
                            .member1(6, "I suspect they also built the portal, maybe even the volcano.")

                            .member3(3, "Here we go again.")
                            .member3(6, "How could anyone build a volcano.")

                            .member1(5, "If you run across any strange doorways, they might be soul doors.")
                            .member1(6, "Soul doors are doors the ancient Sybarian civilization...")
                            .member1(6, "...that could recognize the soul of a person and allow passage.")
                            .member1(5, "Ancient writings speak of keys that you use to make the door recognize you...")
                            .member1(7, "but there's not much more information than that.")

                            .member5(5, "Quit telling those children stories.")
                            .member5(5, "{GREEN}There's work to be done.")

                            .playerLook()

                            .pause(1)

                            .end();
                    });
                });

            // add 30 seconds to allow the player time
            // to accept the quest.
            talk.padTime(30);
        });

    });

}());