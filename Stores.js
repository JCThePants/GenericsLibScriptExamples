try {
    // Java 8 compatibility
    load("nashorn:mozilla_compat.js");
}
catch (e) {
    // Java 7, ignore
}

depends.on("Storefront, ArborianQuests", function() {

    include.api("ArborianQuests", "quests", "quests");
    include.api("Storefront", "storefront", "storefront");

    var npcRegistry = npcProvider.createRegistry("stores");

    /*
     * Libs
     */
    include.script("globalUtils.js");
    include.script("status_tracker.js");
    include.script("questlib.js");
    include.script("dialog.js");

    // Constants
    include.script("quests/global/constants.js");

    var stores = [
        {
            name : "test",
            location : quests.locations.get("test")
        }
    ];

    var run = function () {

        for (var i=0; i < stores.length; i++) {
            var store = stores[i];

            createNPCInterface(store.name, store.location);
        }
    };

    /*
     * Create an NPC at the specified location that can be
     * clicked on to open the account menu.
     */
    function createNPCInterface(storeName, location) {

        var store = storefront.getStore(storeName);
        if (!store) {
            msg.debug("Store named " + storeName + " not found.");
            return;
        }

        var npc = npcRegistry
            .create("Store Clerk", "VILLAGER")
            .onNpcRightClick(function (event) {
                var player = event.getPlayer();
                showMenu(player, storeName);
            });

        if (!store.hasOwner()) {
            npc.spawn(location);
        }

        events.on("com.jcwhatever.nucleus.events.regions.RegionOwnerChangedEvent", "MONITOR",
            function (event) {

                if (event.getNewOwnerId() == null) {
                    npc.despawn();
                }
                else {
                    npc.spawn(location);
                }

            });

        npc.getTraits().add("NpcTraitPack:Looking")
            .lookClose();

        npc.getTraits().get("NpcTraitPack:LivingEntity")
            .setProfession('.random');
    }

    /*
     * Show stable manager menu to a player
     */
    function showMenu(player, storeName) {
        storefront.openMenu(player, storeName);
    }

    // run the script
    run();
});