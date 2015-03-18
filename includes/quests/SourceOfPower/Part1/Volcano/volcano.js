(function () {

    /**
     * Enter Volcano arena
     */
    quests.regions.onEnter(_regions.volcano.ENTRANCE, function (player, region) {

        if (!isTaskComplete(player, _tasks.teleportation.PICKUP_SPELL))
            return;

        // join arena
        pvstar.join(volcanoArena, player);

        setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "EXPLORE_VOLCANO",
            "Explore around a bit.");
    });

    /**
     * Exit arena front door
     */
    quests.regions.onEnter(_regions.volcano.ENTRANCE_EXIT, function (player, region) {

        // for players in the Volcano quest
        if (isCurrentQuest(player, _quests.SOURCE_OF_POWER.PART_1.quest)) {

            // do not allow player to leave until they have inspected the large door
            if (!isTaskComplete(player, _tasks.volcano.VISIT_LARGE_DOOR)) {
                return;
            }
        }

        completeTask(player, _tasks.volcano.COMPLETE);

        // leave arena
        pvstar.leave(volcanoArena, player);

        setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "EXIT_VOLCANO",
            "Tell someone there are zombies beneath the volcano.");
    });

    /**
     * Zombies exclamation
     */
    quests.regions.onEnter(_regions.volcano.ZOMBIES, function (player, region) {
        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER.PART_1.quest) ||
            isTaskComplete(player, _tasks.volcano.ZOMBIES))
            return;

        completeTask(player, _tasks.volcano.ZOMBIES);

        playerTalk(player, "Zombies!");
    });

    /**
     * Inspect large door
     */
    quests.regions.onEnter(_regions.volcano.INSPECT_LARGE_DOOR, function (player, region) {

        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER.PART_1.quest) ||
            isTaskComplete(player, _tasks.volcano.VISIT_LARGE_DOOR)) {
            return;
        }

        completeTask(player, _tasks.volcano.VISIT_LARGE_DOOR);

        talkSession(player, function (talk) {
            talk
                .player(3, "This door is even stranger than the first, and the magic is even stronger.")
                .player(3, "I would go through but my first priority is to tell someone what I have seen here.")
                .player(3, "{GREEN}I guess the only way out is back the way I came.")
                .execute(function () {
                    setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "EXIT_VOLCANO",
                        "Return back the way you entered and tell someone there are zombies beneath the volcano.");
                })
        });

    });

}());