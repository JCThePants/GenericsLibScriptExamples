(function() {

    var npc = npcGuides.create("Guide", "VILLAGER");

    npc.getTraits().add("NpcTraitPack:Looking")
        .lookClose();

    var location = quests.locations.get("HallOfHeroes_NPC_Guide");

    npc.spawn(location);

    // Setup NPC RIGHT CLICK
    npc.onNpcRightClick(function (event) {

        var player = event.getPlayer();

        if (isTalking(player))
            return;

        talkSession(player, function (talk) {

            var npcName = "Guide";

            talk
                .npc(4, npcName, "Welcome to the Hall of Heroes.")
                .npc(4, npcName, "It doesn't look much like a hall...")
                .npc(4, npcName, "...but when there isn't enough room...")
                .npc(4, npcName, "...sometimes magic is the only solution.");
        });
    });

}());