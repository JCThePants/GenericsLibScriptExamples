
try {
    // Java 8 compatibility
    load("nashorn:mozilla_compat.js");
}
catch (e) {
    // Java 7, ignore
}



depends.on("ArborianQuests", function() {

    include.api("ArborianQuests", "quests", "quests");

    npcGuides = npcProvider.createRegistry("guides");

    defaultComparer = inventory.getDefaultComparer();

    /*
     * Libs
     */
    include.script("globalUtils.js");
    include.script("pvUtils.js");
    include.script("status_tracker.js");
    include.script("questlib.js");
    include.script("item_hunt_lib.js");
    include.script("dialog.js");

    // Constants
    include.script("quests/global/constants.js");

    // Great Tree Guide
    include.script("guides/great_tree.js");

    // Hall of Heroes Guide
    include.script("guides/hall_of_heroes.js");
});