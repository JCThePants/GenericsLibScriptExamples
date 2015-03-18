(function() {

    var npc = npcGuides.create("Guide", "VILLAGER");

    npc.getTraits().add("NpcTraitPack:Looking")
        .lookClose();

    var location = quests.locations.get("GreatTree_NPC_Guide");

    npc.spawn(location);

    // Setup NPC RIGHT CLICK
    npc.onNpcRightClick(function (event) {

        var player = event.getPlayer();

        if (isTalking(player))
            return;

        talkSession(player, function (talk) {

            var npcName = "Guide";

            talk
                .npc(4, npcName, "Welcome to the Great Tree of Arboria.")
                .npc(4, npcName, "This tree is very very old.")
                .npc(5, npcName, "So old there are no records of a time when it wasn't here.")
                .npc(3, npcName, "Some say its magical...")
                .npc(6, npcName, "I suppose that's true since the Council of Wizards resides at the very top.")
                .npc(3, npcName, "Feel free to look around.")
                .npc(5, npcName, "But try not to make too much noise. People live here.");
        });
    });

}());