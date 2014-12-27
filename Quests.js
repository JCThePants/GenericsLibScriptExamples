
depends.on("PV-Star, PhantomPackets, ArborianQuests, Citizens, NucleusCitizens", function() {

    include.api("PhantomPackets", "phantom", "phantom");
    include.api("ArborianQuests", "quests", "quests");
    include.api("PV-Star", "pvstar", "pvstar");
    include.api("PV-Star", "pvSubRegions", "pvSubRegions");
    include.api("NucleusCitizens", "nucleusCitizens", "nCitizens");

    citizens = nCitizens.createTransient();

    defaultComparer = inventory.getDefaultComparer();

    /*
     * Libs
     */
    include.script("globalUtils.js");
    include.script("pvUtils.js");
    include.script("status_tracker.js");
    include.script("questlib.js");
    include.script("item_hunt_lib.js");
    include.script("citizensUtils.js");
    include.script("dialog.js");

    // Constants
    include.script("quests/global/constants.js");

    // King
    include.script("quests/global/king.js");

    // Wizard Council
    include.script("quests/global/wizard_council.js");

    // Source Of Power Part 1 Quest
    include.script("quests/SourceOfPower/Part1/SOP_Part1.js");

    // Source Of Power Part 2 Quest
    include.script("quests/SourceOfPower/Part2/SOP_Part2.js");

    // Source Of Power Part 3 Quest
    include.script("quests/SourceOfPower/Part3/SOP_Part3.js");

});