
(function () {

    /*
     * Quest
     */
    quest = quests.create(_quests.SOURCE_OF_POWER_1.name, _quests.SOURCE_OF_POWER_1.display);

// Research (Spawn)
    include.script("quests/SourceOfPower/Part1/Research/research_constants.js",
        "quests/SourceOfPower/Part1/Research/research.js");

// Teleportation (Spawn)
    include.script("quests/SourceOfPower/Part1/Teleportation/teleportation.js");

// Arena: Volcano
    include.script("quests/SourceOfPower/Part1/Volcano/volcano.js");

// Tell the king
    include.script("quests/SourceOfPower/Part1/TellTheKing/tell_the_king.js");

// Wizard Council
    include.script("quests/SourceOfPower/Part1/WizardCouncil/wizard_council.js");

}());


