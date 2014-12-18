var _quests = {
    SOURCE_OF_POWER_1 : {
        name: "SourceOfPower1",
        display: "Source of Power Part 1"
    },
    SOURCE_OF_POWER_2 : {
        name: "SourceOfPower2",
        display: "Source of Power Part 2"
    }
};

var _arenaNames = {
    VOLCANO : "Volcano"
};

/**
 * PV-Star events
 */
var _pvEvents = {
    ARENA_STARTED : "com.jcwhatever.bukkit.pvs.api.events.ArenaStartedEvent",
    ARENA_ENDED : "com.jcwhatever.bukkit.pvs.api.events.ArenaEndedEvent",
    PLAYER_JOINED : "com.jcwhatever.bukkit.pvs.api.events.players.PlayerJoinedEvent",
    PLAYER_LEAVE : "com.jcwhatever.bukkit.pvs.api.events.players.PlayerLeaveEvent",
    PLAYER_ADDED : "com.jcwhatever.bukkit.pvs.api.events.players.PlayerAddedEvent"
};

/**
 * Bukkit based events
 */
var _bukkitEvents = {
    PLAYER_INTERACT: "org.bukkit.event.player.PlayerInteractEvent",
    NPC_RIGHT_CLICK : "net.citizensnpcs.api.event.NPCRightClickEvent"
};

/**
 * GenericsCitizensLib events
 */
var _npcEvents = {
    RIGHT_CLICK : "com.jcwhatever.bukkit.generic.citizens.events.NPCRightClickEvent"
};

/**
 * ArborianQuests flags
 */
var _tasks = {

    research : {
        RESEARCH_ACCEPTED : [_quests.SOURCE_OF_POWER_1.name, "Research", "Accepted"],
        VOLCANO_ENTRANCE_DISCOVERY : [_quests.SOURCE_OF_POWER_1.name, "Research", "VolcanoEntranceDiscovery"],
        RESEARCH_COMPLETE : [_quests.SOURCE_OF_POWER_1.name, "Research", "Complete"]
    },

    teleportation : {
        TALK_TO_WIZARD : [_quests.SOURCE_OF_POWER_1.name, "Teleportation", "TallkToWizard"],
        PICKUP_SPELL : [_quests.SOURCE_OF_POWER_1.name, "Teleportation", "PickupSpell"]
    },

    volcano : {
        ZOMBIES : [_quests.SOURCE_OF_POWER_1.name, "Volcano", "Zombies"],
        VISIT_LARGE_DOOR : [_quests.SOURCE_OF_POWER_1.name, "Volcano", "VisitLargeDoor"],
        COMPLETE : [_quests.SOURCE_OF_POWER_1.name, "Volcano", "Complete"]
    },

    tellTheKing : {
        TELL_SOMEONE : [_quests.SOURCE_OF_POWER_1.name, "TellTheKing", "TellSomeOne"],
        TELL_THE_KING : [_quests.SOURCE_OF_POWER_1.name, "TellTheKing", "TellTheKing"],
        PICKUP_ORDERS : [_quests.SOURCE_OF_POWER_1.name, "TellTheKing", "PickupOrders"]
    },

    wizardCouncil : {
        ACCEPT_PART2 : [_quests.SOURCE_OF_POWER_2.name, "WizardCouncil", "AcceptPart2"]
    },

    wizardForest : {
        GET_KEY : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "GetKey"],
        PICKUP_LOG_BOOK : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "PickupLogBook"],
        COMPLETE : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "Complete"],

        NOT_A_SOUL_DOOR : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "NotASoulDoor"],
        INSPECT_EXIT : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "InspectExit"],
        KEY_NOT_WORKING : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "KeyNotWorking"],
        WONDER : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "Wonder"],
        INNER_DOOR_OPENED : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "InnerDoorOpened"],

        TALK_TO_COUNCIL : [_quests.SOURCE_OF_POWER_2.name, "WizardForest", "TalkToCouncil"]
    },

    mausoleum : {
        TALK_TO_ANCIENT_WIZARD : [_quests.SOURCE_OF_POWER_2.name, "Mausoleum", "TalkToAncientWizard"]
    },

    crypts : {
        GET_KEY : [_quests.SOURCE_OF_POWER_2.name, "Crypts", "GetKey"],
        EXIT_OPENED : [_quests.SOURCE_OF_POWER_2.name, "Crypts", "ExitOpened"],
        VISIT_EXIT : [_quests.SOURCE_OF_POWER_2.name, "Crypts", "VisitExit"]
    },

    caverns : {
        EXIT_OPENED : [_quests.SOURCE_OF_POWER_2.name, "Caverns", "ExitOpened"]
    }
};

/**
 * ArborianQuests item names
 */
var _itemNames = {

    research : {
        LAVA_SAMPLE : "Lava_Sample"
    },

    teleportation : {
        SPELL : "SoP_TPWizard_Spell"
    },

    tellTheKing : {
        KINGS_ORDERS : "SoP_KingsOrders"
    },

    wizardForest : {
        SOUL_KEY: "WizardForest_Key"
    },

    crypts : {
        SOUL_KEY : "Crypts_Key"
    },

    caverns : {
        SOUL_KEY : "Soul_Key"
    }
};

/**
 * ArborianQuests region names
 */
var _regions = {

    wizardCouncil : {
        QUEUE_TO_SPEAK : "WizardCouncilQueue",
        WAITING_ROOM : "WizardCouncilWaitingRoom",
        SPEAK : "SoP_WizardCouncilTalk"
    },

    research : {
        VOLCANO_ENTRANCE_DISCOVERY : "Volcano_Entrance_Discovery"
    },

    volcano : {
        ENTRANCE : "Volcano_Entrance_Exterior",
        ENTRANCE_EXIT : "Volcano_Entrance_Interior",
        ZOMBIES : "Volcano_Zombies",
        INSPECT_LARGE_DOOR : "Volcano_InspectLargeDoor"
    },

    // crypts arena
    crypts : {
        ENTRANCE : "Crypts_Entrance",
        ENTRANCE_BUFFER : "Crypts_Buffer",
        EXIT : "SecretLibrary_Entrance",

        puzzle : {
            HALLWAY: "Crypts_Hallway",
            BLUE_SWITCH: "Crypts_Switch_Blue",
            GREEN_SWITCH: "Crypts_Switch_Green"
        }
    },

    caverns : {
        CAVERN_EXIT : "AncientCavern_Exit"
    }
};

/**
 * ArborianQuests location names
 */
var _locations = {

    king : {
        KING : "King"
    },

    wizardCouncil : {
        ENTER : "WizardCouncilEnter",
        EXIT : "WizardCouncilExit",
        NPC_MEMBER_1 : "WizardCouncil1",
        NPC_MEMBER_2 : "WizardCouncil2",
        NPC_MEMBER_3 : "WizardCouncil3",
        NPC_MEMBER_4 : "WizardCouncil4",
        NPC_MEMBER_5 : "WizardCouncil5",
        NPC_MEMBER_6 : "WizardCouncil6",
        NPC_MEMBER_7 : "WizardCouncil7"
    },

    // research quest
    research : {
        LAVA_SAMPLE1 : "SoP_Research_Lava",
        LAVA_SAMPLE2 : "SoP_Research_Lava2",
        LAVA_SAMPLE3 : "SoP_Research_Lava3",
        LAVA_SAMPLE4 : "SoP_Research_Lava4",
        LAVA_SAMPLE5 : "SoP_Research_Lava5",
        LAVA_SAMPLE6 : "SoP_Research_Lava6",
        LAVA_SAMPLE7 : "SoP_Research_Lava7",
        LAVA_SAMPLE8 : "SoP_Research_Lava8",
        NPC_RESEARCHER1 : "SoP_NPC_Researcher1",
        NPC_RESEARCHER2 : "SoP_NPC_Researcher2",
        NPC_RESEARCHER3 : "SoP_NPC_Researcher3"
    },

    // teleport quest
    teleportation : {
        NPC_TELEPORT_WIZARD : "SoP_TPWizard",
        SPELL : "SoP_TPWizard_Spell"
    },

    tellTheKing : {
        KING_GIVE : "King_Give"
    },

    // crypts arena
    crypts : {
        ENTRANCE :"Crypts_Entrance",
        ENTRANCE_BUFFER : "Crypts_Buffer",
        SOUL_KEY_BASE_NAME : "Crypts_Key"
    },

    // caverns arena
    caverns : {
        SOUL_KEY : "Caverns_Soul_Key"
    }
};

/**
 * PhantomPackets region names
 */
var _phantomRegions = {

    crypts: {
        EXIT_DOOR : "Crypts_Exit_Door",
        BLUE_DOOR: "Crypts_Entrance_Door_Blue",
        GREEN_DOOR: "Crypts_Entrance_Door_Green"
    },

    caverns : {
        CAVERN_EXIT : "Caverns_Exit_Door"
    }

};


var _global = {

    npc : {
        KING : null,
        WIZARD_COUNCIL_MEMBER_1 : null,
        WIZARD_COUNCIL_MEMBER_2 : null,
        WIZARD_COUNCIL_MEMBER_3 : null,
        WIZARD_COUNCIL_MEMBER_4 : null,
        WIZARD_COUNCIL_MEMBER_5 : null,
        WIZARD_COUNCIL_MEMBER_6 : null,
        WIZARD_COUNCIL_MEMBER_7 : null
    },

    character : {
        KING : {
            name : "King",
            skin : "JCThePants",
            type : "PLAYER"
        },

        TELEPORT_WIZ : {
            name : "Teleport Wiz",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_1 : {
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_2 : {
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_3 : {
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_4 : {
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_5 : {
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_6 : {
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_7 : {
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        }
    },

    npcEvents : {
        RIGHT_CLICK : "com.jcwhatever.bukkit.generic.citizens.events.NPCRightClickEvent"
    }
};