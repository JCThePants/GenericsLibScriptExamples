(function () {

    var _npcLocations = [
        _locations.research.NPC_RESEARCHER1,
        _locations.research.NPC_RESEARCHER2,
        _locations.research.NPC_RESEARCHER3
    ];

    var npc = [
        getResearcherNPC(0),
        getResearcherNPC(1),
        getResearcherNPC(2)
    ];

    var sampleLocations = [
        quests.locations.get(_locations.research.LAVA_SAMPLE1),
        quests.locations.get(_locations.research.LAVA_SAMPLE2),
        quests.locations.get(_locations.research.LAVA_SAMPLE3),
        quests.locations.get(_locations.research.LAVA_SAMPLE4),
        quests.locations.get(_locations.research.LAVA_SAMPLE5),
        quests.locations.get(_locations.research.LAVA_SAMPLE6),
        quests.locations.get(_locations.research.LAVA_SAMPLE7),
        quests.locations.get(_locations.research.LAVA_SAMPLE8)
    ];

    var lavaSample = quests.items.getItem(_itemNames.research.LAVA_SAMPLE);
    var lavaSamples = [];
    var questStatus = new StatusTracker();

    // Setup lava samples
    for (var i=0; i < sampleLocations.length; i++) {
        var sample = quests.items.createFloatingItem(lavaSample, sampleLocations[i]);
        lavaSamples.push(sample);
        if (!sample.spawn()) {
            msg.debug("Failed to spawn sample " + i);
        }

        phantom.entity.addEntity(sample.getEntity());

        setupSamplePickup(sample, i);
    }

    /**
     * Detect player entering volcano entrance discovery region.
     */
    quests.regions.onEnter(_regions.research.VOLCANO_ENTRANCE_DISCOVERY, function (player, region) {

        // check player is in quest
        var status = questStatus.getStatus(player.getUniqueId());
        if (status == null)
            return;

        if (status.isEntranceDiscovered) {
            return;
        }

        status.isEntranceDiscovered = true;
        completeTask(player, _tasks.research.VOLCANO_ENTRANCE_DISCOVERY);

        talkSession(player, function (talk) {
            talk
                .player(2, "This is strange.")
                .player(3, "I wonder whats behind the door.")
                .player(3, "It seems to be sealed with a very strong magic.");

            if (status.samples != lavaSamples.length) {
                talk.player(1, "I'll tell the researchers about it when I'm done collecting samples.");
            }
        });
    });


    // Util: Setup a lava sample pickup event handler
    function setupSamplePickup(sample, index) {
        quests.items.onPickup(sample, function (player) {

            var status = questStatus.getStatus(player.getUniqueId());
            if (status == null)
                return;

            // check if the sample has already been picked up
            if (status["sample" + index]) {
                return;
            }

            status["sample" + index] = true;

            phantom.entity.removeViewer(player, sample.getEntity());

            status.samples++;

            msg.tell(player, status.samples + " of " + lavaSamples.length + " samples collected.");

            if (status.samples == lavaSamples.length) {
                msg.tell(player, "{GREEN}That should be enough samples.");

                setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "RETURN_LAVA",
                    "Take the lava samples from the volcano back to the researchers.");
            }
        });
    }

    /**
     * Get and setup Researcher NPC
     */
    function getResearcherNPC(index) {

        var npc = npcs.create("Researcher" + index, "Researcher", "VILLAGER");
        npc.getTraits().add("NpcTraitPack:Looking")
            .lookClose();

        var location = quests.locations.get(_npcLocations[index]);
        npc.spawn(location);

        // Setup NPC RIGHT CLICK
        npc.onNpcRightClick(function (event) {

            var player = event.getPlayer();

            // Do nothing if the quest has already been completed.
            if (isTaskComplete(player, _tasks.research.RESEARCH_COMPLETE)) {

                //npcTalk(player, "Researcher", "{GREEN}Thank you very much for your assistance.");

                return;
            }

            // Check if player has already accepted the quest
            if (isTaskComplete(player, _tasks.research.RESEARCH_ACCEPTED)) {

                // get lava samples status
                var status = questStatus.getStatus(player.getUniqueId());
                if (status) {

                    // player has not collected any samples
                    if (status.samples == 0) {
                        npcTalk(player, "Researcher", "Have you collected those samples yet?");
                        showSamples(player, lavaSamples);
                    }
                    // player has not collected enough samples
                    else if (status.samples != lavaSamples.length) {
                        npcTalk(player, "Researcher", "We need more samples than that.");
                    }
                    // player has collected all the samples
                    else {

                        var isDoorDiscovered = isTaskComplete(player, _tasks.research.VOLCANO_ENTRANCE_DISCOVERY);

                        var completionColor = isDoorDiscovered ? "" : "{GREEN}";

                        if (isDoorDiscovered) {

                            talkSession(player, function (talk) {

                                talk
                                    .npc(2, "Researcher", "{GREEN}Thank you very much for your assistance.")

                                    .player(3, "I discovered a strange doorway in the volcano...")
                                    .player(2, "But it was sealed with magic.")

                                    .npc(2, "Researcher", "Hmmmm...")
                                    .npc(3, "Researcher", "I've never heard of any doors beneath the volcano.")
                                    .npc(4, "Researcher", "{GREEN}Maybe you should find a wizard that specializes in teleportation.")

                                    .execute(function () {

                                        setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "FIND_TP_WIZ",
                                            "Find a wizard that specializes in teleportation magic " +
                                            "so you can enter the door beneath the volcano.");
                                    });


                            });

                            completeTask(player, _tasks.research.RESEARCH_COMPLETE);
                        }
                        else {

                            npcTalk(player, "Researcher", "Thank you very much for your assistance.");

                            // allow player to replay since the primary objective was not completed
                            clearTask(player, _tasks.research.RESEARCH_ACCEPTED);

                            setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "RESEARCH_INCOMPLETE",
                                "You didn't complete the hidden objective.");
                        }

                        questStatus.removeStatus(player.getUniqueId());
                    }

                    return;
                }
            }


            // make sure player isn't already listening to the intro.
            if (isTalking(player)) {
                return;
            }

            talkSession(player, function (talk) {

                talk
                    .npc(4, "Researcher", "We are researching this volcano.")
                    .npc(6, "Researcher", "It is the source of Arborias magic and sustains life here.")
                    .npc(4, "Researcher", "Unfortunately, the magic is dwindling...")
                    .npc(4, "Researcher", "...which is why magic is being rationed.")
                    .npc(4, "Researcher", "We've been tasked to research the volcano...")
                    .npc(6, "Researcher", "...and discover how the magic is produced so that maybe we can fix it.")

                    .npc(4, "Researcher", "Right now we are collecting lava samples.")
                    .npc(4, "Researcher", "We could use some help if you don't mind.")

                    .execute(function () {

                        queryQuest(player, _quests.SOURCE_OF_POWER.name, function () {

                            joinQuest(player, _quests.SOURCE_OF_POWER.PART_1.quest);

                            showSamples(player, lavaSamples);

                            questStatus.addStatus(player.getUniqueId()).samples = 0;
                            completeTask(player, _tasks.research.RESEARCH_ACCEPTED);

                            _titles.SOURCE_OF_POWER_1_ACCEPT.showTo(player);

                            msg.tell(player, "Source of Power Part 1 accepted.");

                            setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "COLLECT_LAVA",
                                "Collect lava samples inside the volcano for the researchers.")
                        });

                    });

            })
        });

        return npc;
    }

    // Util: Show all lava samples to player
    function showSamples(player, lavaSamples) {
        for (var i=0; i < lavaSamples.length; i++) {
            var sample = lavaSamples[i];
            phantom.entity.addViewer(player, sample.getEntity());
        }
    }

}());

