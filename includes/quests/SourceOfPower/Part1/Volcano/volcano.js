(function () {

    var _regionNames = {
        ENTRANCE : "Volcano_Entrance_Exterior",
        ENTRANCE_EXIT : "Volcano_Entrance_Interior",
        ZOMBIES : "Volcano_Zombies",
        INSPECT_LARGE_DOOR : "Volcano_InspectLargeDoor"
    };

    var volcanoArena = pvstar.getArenaByName(_arenaNames.VOLCANO);

    /**
     * Enter Volcano arena
     */
    quests.regions.onEnter(_regionNames.ENTRANCE, function (player, region) {

        if (!isTaskComplete(player, _tasks.teleportation.PICKUP_SPELL))
            return;

        // join arena
        pvstar.join(volcanoArena, player);
    });


    /**
     * Exit arena front door
     */
    quests.regions.onEnter(_regionNames.ENTRANCE_EXIT, function (player, region) {

        // for players in the Volcano quest
        if (isCurrentQuest(player, _quests.SOURCE_OF_POWER_1.name)) {

            // do not allow player to leave until they have inspected the large door
            if (!isTaskComplete(player, _tasks.volcano.VISIT_LARGE_DOOR)) {
                return;
            }
        }

        completeTask(player, _tasks.volcano.COMPLETE);

        // leave arena
        pvstar.leave(volcanoArena, player);
    });


    /**
     * Zombies exclamation
     */
    quests.regions.onEnter(_regionNames.ZOMBIES, function (player, region) {
        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER_1.name) ||
            isTaskComplete(player, _tasks.volcano.ZOMBIES))
            return;

        completeTask(player, _tasks.volcano.ZOMBIES);

        playerTalk(player, "Zombies!");
    });


    /**
     * Inspect large door
     */
    quests.regions.onEnter(_regionNames.INSPECT_LARGE_DOOR, function (player, region) {

        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER_1.name) ||
            isTaskComplete(player, _tasks.volcano.VISIT_LARGE_DOOR)) {
            return;
        }

        completeTask(player, _tasks.volcano.VISIT_LARGE_DOOR);

        talkSession(player, function (talk) {
            talk.player(3, "This door is even stranger than the first, and the magic is even stronger.");
            talk.player(3, "I would go through but my first priority is to tell someone what I have seen here.");
            talk.player(3, "{GREEN}I guess the only way out is back the way I came.");
        });

    });

}());