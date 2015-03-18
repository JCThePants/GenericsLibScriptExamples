(function () {
    var _playLists = {
        SPAWN_DARK: [
            sounds.get("AngevinB"),
            sounds.get("ConstancyPartOne"),
            sounds.get("NoMoreMagic"),
            sounds.get("Soliloquy")
        ],
        ANCIENT_WIZARD: [
            sounds.get("MagicalTheme")
        ],
        WIZARD_FOREST: [
            sounds.get("LittlePeople")
        ],
        VOLCANO_INITIAL: [
            sounds.get("DarkDescent")
        ],
        // Source Of Power Quest / Part 3 / Caverns / Initial playlist
        SOP_PART3_A: [
            sounds.get("Stormfront"),
            sounds.get("FiveArmies")
        ],
        SOP_PART3_B: [
            sounds.get("ARegularBattle"),
            sounds.get("DarkWinds"),
            sounds.get("TheLoomingBattle")
        ],
        SOP_PART3_C: [
            sounds.get("HeroicDemise2013"),
            sounds.get("FiveArmies"),
            sounds.get("TheDarkAmulet"),
            sounds.get("DarkDescent")
        ]
    };

    var _musicRegions = {
        SPAWN: "Spawn",
        UNDERWORLD_VIA_VOLCANO: "Underworld1",
        UNDERWORLD_VIA_MAUSOLEUM: "Underworld2",
        UNDERWORLD_PART3: "SoPPart3"
    };

    /**
     * Handle Spawn Music Region
     */
    events.on("com.jcwhatever.musical.events.MusicLoopEvent", "NORMAL", function (event) {

        if (!event.getRegion().getName().equalsIgnoreCase(_musicRegions.SPAWN))
            return;

        var player = event.getPlayer();

        // player must be in the Source of Power Quest and completed the volcano from part1.
        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER.quest) || !isTaskComplete(player, _tasks.volcano.COMPLETE)) {
            return;
        }

        event.getSounds().clear();
        event.getSounds().addAll(_playLists.SPAWN_DARK.toRandomList());
    });

    /**
     * Handle Underworld region (Volcano)
     */
    events.on("com.jcwhatever.musical.events.MusicLoopEvent", "NORMAL", function (event) {

        var player = event.getPlayer();

        if (!event.getRegion().getName().equals(_musicRegions.UNDERWORLD_VIA_VOLCANO))
            return;

        if (isCurrentQuest(player, _quests.SOURCE_OF_POWER.PART_3.quest)) {
            event.setCancelled(true);
            return;
        }

        if (music.isListeningRegion(player, _musicRegions.UNDERWORLD_VIA_MAUSOLEUM)) {
            event.setCancelled(true);
            return;
        }

        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER.quest) || !isTaskComplete(player, _tasks.volcano.COMPLETE)) {
            return;
        }

        event.getSounds().clear();
        event.getSounds().addAll(_playLists.WIZARD_FOREST.toList());
    });

    /**
     * Handle Underworld region (Mausoleum)
     */
    events.on("com.jcwhatever.musical.events.MusicLoopEvent", "NORMAL", function (event) {

        if (!event.getRegion().getName().equals(_musicRegions.UNDERWORLD_VIA_MAUSOLEUM))
            return;

        var player = event.getPlayer();

        if (music.isListeningRegion(player, _musicRegions.UNDERWORLD_PART3)) {
            event.setCancelled(true);
            return;
        }

        if (music.isListeningRegion(player, _musicRegions.UNDERWORLD_VIA_VOLCANO)) {
            event.setCancelled(true);
        }
    });

    /**
     * Handle Underworld region (Volcano) for SOP Quest PART 3
     */
    events.on("com.jcwhatever.musical.events.MusicLoopEvent", "NORMAL", function (event) {

        if (!event.getRegion().getName().equals(_musicRegions.UNDERWORLD_PART3))
            return;

        var player = event.getPlayer();

        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER.PART_3.quest)) {
            event.setCancelled(true);
            return;
        }

        if (music.isListeningRegion(player, _musicRegions.UNDERWORLD_VIA_MAUSOLEUM)) {
            event.setCancelled(true);
            return;
        }

        if (isTaskComplete(player, _tasks.caverns.PICKUP_KEY)) {
            event.getSounds().clear();
            event.getSounds().addAll(_playLists.SOP_PART3_C.toRandomList());
        }
        else if (isTaskComplete(player, _tasks.caverns.MAZE_OPENED) || event.getLoopCount() > 0) {
            event.getSounds().clear();
            event.getSounds().addAll(_playLists.SOP_PART3_B.toRandomList());
        }
        else {
            event.getSounds().clear();
            event.getSounds().addAll(_playLists.SOP_PART3_A.toList());
        }
    });
}());