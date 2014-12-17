
depends.on("PV-Star, PhantomPackets, ArborianQuests, Citizens, GenericsCitizensLib", function() {

    include.api("PhantomPackets", "phantom", "phantom");
    include.api("ArborianQuests", "quests", "quests");
    include.api("PV-Star", "pvstar", "pvstar");
    include.api("PV-Star", "pvSubRegions", "pvSubRegions");
    include.api("GenericsCitizensLib", "genericsCitizens", "genericsCitizens");

    citizens = genericsCitizens.createTransient();

    defaultComparer = inventory.getDefaultComparer();

    /*
     * Libs
     */
    include.script("global_utils.js");
    include.script("status_tracker.js");
    include.script("questlib.js");
    include.script("event_names.js");
    include.script("item_hunt_lib.js");
    include.script("citizensUtils.js");
    include.script("dialog.js");

    // Constants
    include.script("quests/global/constants.js");

    // King
    include.script("quests/global/king.js");

    // Wizard Council
    include.script("quests/global/wizard_council.js");

    // Source Of Power ACT 1 Quest
    include.script("quests/SourceOfPower/Part1/SOP_Part1.js");

    // Source Of Power ACT 2 Quest
    include.script("quests/SourceOfPower/Part2/SOP_Part2.js");

});