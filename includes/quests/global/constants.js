

var _quests = {
    SOURCE_OF_POWER : {
        name: "SourceOfPower",
        display: "Source of Power",
        quest : "SourceOfPower",

        PART_1 : {
            name: "Part1",
            display: "Source of Power Part 1",
            quest : "SourceOfPower.Part1"
        },
        PART_2 : {
            name: "Part2",
            display: "Source of Power Part 2",
            quest : "SourceOfPower.Part2"
        },
        PART_3 : {
            name: "Part3",
            display: "Source of Power Part 3",
            quest : "SourceOfPower.Part3"
        }
    }
};

var _arenaNames = {
    VOLCANO : "Volcano",
    WIZARD_FOREST : "WizardForest",
    MAUSOLEUM : "Mausoleum",
    CRYPTS : "Crypts",
    SECRET_LIBRARY : "SecretLibrary",
    CAVERNS : "Caverns",
    POWER_CORE: "PowerCore"
};

var _titles = {
    SOURCE_OF_POWER_1_ACCEPT : titles.create("{BLUE}Quest Accepted", "Source of Power Part 1", 10, 40, 20),
    SOURCE_OF_POWER_1_COMPLETE : titles.create("{GREEN}Part 1 Complete", "Source of Power Part 1", 10, 20, 20),
    SOURCE_OF_POWER_2_ACCEPT : titles.create("{BLUE}Quest Accepted", "Source of Power Part 2", 10, 40, 20),
    SOURCE_OF_POWER_2_COMPLETE : titles.create("{GREEN}Part 2 Complete", "Source of Power Part 2", 10, 20, 20),
    SOURCE_OF_POWER_3_ACCEPT : titles.create("{BLUE}Quest Accepted", "Source of Power Part 3", 10, 40, 20),
    SOURCE_OF_POWER_COMPLETE : titles.create("{GREEN}Quest Complete", "Source of Power Complete. {GREEN}Good work.", 10, 80, 40)
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

var _pvSpawns = {

    mausoleum : {
        WIZARD : "ancientWizard"
    },

    powerCore : {
        // initial spawns
        BOSS1: "Boss1",
        BOSS7: "Boss7",

        // other spawns
        BOSS2: "Boss2",
        BOSS3: "Boss3",
        BOSS4: "Boss4",
        BOSS5: "Boss5",
        BOSS6: "Boss6"
    }
};

var _pvSubRegions = {

    powerCore : {
        GRINDER : "grinder"
    }

};

/**
 * Bukkit based events
 */
var _bukkitEvents = {
    PLAYER_INTERACT: "org.bukkit.event.player.PlayerInteractEvent",
    BLOCK_PLACE : "org.bukkit.event.block.BlockPlaceEvent",
    NPC_RIGHT_CLICK : "com.jcwhatever.nucleus.providers.npc.events.NpcRightClickEvent"
};

/**
 * GenericsCitizensLib events
 */
var _npcEvents = {
    RIGHT_CLICK : "com.jcwhatever.nucleus.citizens.events.NPCRightClickEvent"
};

var _material = {
    AIR : org.bukkit.Material.AIR,
    OBSIDIAN : org.bukkit.Material.OBSIDIAN,
    SADDLE : org.bukkit.Material.SADDLE
};

/**
 * ArborianQuests flags
 */
var _tasks = {

    research : {
        RESEARCH_ACCEPTED : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Research", "Accepted"] },
        VOLCANO_ENTRANCE_DISCOVERY : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Research", "VolcanoEntranceDiscovery"] },
        RESEARCH_COMPLETE : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Research", "Complete"] }
    },

    teleportation : {
        TALK_TO_WIZARD : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Teleportation", "TallkToWizard"] },
        PICKUP_SPELL : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Teleportation", "PickupSpell"] }
    },

    volcano : {
        ZOMBIES : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Volcano", "Zombies"] },
        VISIT_LARGE_DOOR : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Volcano", "VisitLargeDoor"] },
        COMPLETE : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["Volcano", "Complete"] }
    },

    tellTheKing : {
        TELL_SOMEONE : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["TellTheKing", "TellSomeOne"] },
        TELL_THE_KING : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["TellTheKing", "TellTheKing"] },
        PICKUP_ORDERS : { path: _quests.SOURCE_OF_POWER.PART_1.quest, task: ["TellTheKing", "PickupOrders"] }
    },

    wizardCouncil : {
        ACCEPT_PART2 : { path: _quests.SOURCE_OF_POWER.name, task: ["WizardCouncil", "AcceptPart2"] },
        ACCEPT_PART3 : { path: _quests.SOURCE_OF_POWER.name, task: ["WizardCouncil", "AcceptPart3"] }
    },

    wizardForest : {
        GET_KEY : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "GetKey"] },
        PICKUP_LOG_BOOK : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "PickupLogBook"] },
        COMPLETE : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "Complete"] },

        NOT_A_SOUL_DOOR : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "NotASoulDoor"] },
        INSPECT_EXIT : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "InspectExit"] },
        INSPECT_INNER_DOOR : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "InspectInnerDoor"] },
        KEY_NOT_WORKING : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "KeyNotWorking"] },
        WONDER : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "Wonder"] },
        INNER_DOOR_OPENED : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "InnerDoorOpened"] },
        EXIT_DOOR_OPENED : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "ExitDoorOpened"] },

        TALK_TO_COUNCIL : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["WizardForest", "TalkToCouncil"] }
    },

    mausoleum : {
        TALK_TO_ANCIENT_WIZARD : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["Mausoleum", "TalkToAncientWizard"] }
    },

    crypts : {
        GET_KEY : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["Crypts", "GetKey"] },
        EXIT_OPENED : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["Crypts", "ExitOpened"] },
        VISIT_EXIT : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["Crypts", "VisitExit"] }
    },

    secretLibrary : {
        GET_BOOK : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["SecretLibrary", "GetBook"] },
        TALK_TO_COUNCIL : { path: _quests.SOURCE_OF_POWER.PART_2.quest, task: ["SecretLibrary", "TalkToCouncil"] }
    },

    caverns : {
        MAZE_OPENED : { path: _quests.SOURCE_OF_POWER.PART_3.quest, task: ["Caverns", "MazeOpened"] },
        PICKUP_KEY : { path: _quests.SOURCE_OF_POWER.PART_3.quest, task: ["Caverns", "PickupKey"] },
        EXIT_OPENED : { path: _quests.SOURCE_OF_POWER.PART_3.quest, task: ["Caverns", "ExitOpened"] }
    }
};

var _sessionTasks = {
    powerCore : {
        BOSS_INTRO : "QUEST_SourceOfPower_PowerCore_BossIntro",
        SECOND_DOOR_OPENED : "QUEST_SourceOfPower_PowerCore_SecondDoorOpened",
        REPAIR_SWORD : "QUEST_SourceOfPower_PowerCore_RepairSword"
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
        SOUL_KEY: "WizardForest_Key",
        LOG_BOOK : "WizardForest_Book"
    },

    crypts : {
        SOUL_KEY : "Crypts_Key"
    },

    secretLibrary : {
        BOOK : "SecretLibrary_Book"
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

    mausoleum : {
        WIZARD_TRIGGER : "Mausoleum_Wizard"
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
        MAZE_ENTRANCE_SWITCH : "Caverns_Maze_Door_Switch",
        PUZZLE_ROOM : "Caverns_Puzzle_Room",
        CAVERN_EXIT : "AncientCavern_Exit"
    },

    powerCore: {
        ENTRANCE : "PowerCore_Entrance",
        BOSS_INTRO_1 : "PowerCore_BossIntro1",
        BOSS_INTRO_2 : "PowerCore_BossIntro2",
        SECOND_DOOR : "PowerCore_SecondDoor",
        THIRD_DOOR : "PowerCore_ThirdDoor",
        LOWER_FLOOR : "SoP_PowerCore_LowerFloor",
        BOSS_KILL : "SoP_PowerCore_BossKill1",
        TP1 : "SoP_PowerCore_TP1",
        TP2 : "SoP_PowerCore_TP2",
        OUTRO : "SoP_Outro"
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

    wizardForest : {
        LOG_BOOK : "WizardForest_Book"
    },

    // crypts arena
    crypts : {
        ENTRANCE :"Crypts_Entrance",
        ENTRANCE_BUFFER : "Crypts_Buffer",
        SOUL_KEY_BASE_NAME : "Crypts_Key"
    },

    secretLibrary : {
        BOOK_BASE_NAME : "SecretLibrary_Book"
    },

    // caverns arena
    caverns : {
        SOUL_KEY : "Caverns_Soul_Key"
    },

    powerCore: {
        ENTRANCE : "PowerCore_Entrance",
        INTRO_BOSS1 : "PowerCore_BossIntro1",
        INTRO_BOSS2 : "PowerCore_BossIntro2",
        THIRD_DOOR_DEST : "PowerCore_ThirdDoor",
        SWORD_REPAIR_1 : "PowerCore_SwordSlot1",
        SWORD_REPAIR_2 : "PowerCore_SwordSlot2",
        SWORD_REPAIR_3 : "PowerCore_SwordSlot3",
        SWORD_REPAIR_4 : "PowerCore_SwordSlot4",
        OUTRO_WIZARD : "SoP_Outro_Wizard",
        UNDERWORLD_BOAT : "Underworld_Boat"
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
        MAZE_DOOR : "Caverns_Maze_Door",
        CAVERN_EXIT : "Caverns_Exit_Door"
    },

    powerCore: {
        SECOND_DOOR : "PowerCore_SecondDoor"
    }
};


var _npcInfo = {
    ANCIENT_WIZARD : {
        name: "Ancient Wizard",
        type: "PLAYER",
        skin: "JCThePants",
        kit : null,
        health : 20
    },
    powerCore : {

        BOSS : {
            name : "Evil Wizard",
            type : "PLAYER",
            skin : "JCThePants",
            kit : "BossWizardEvil",
            health: 60
        },

        BOSS_HORSE : {
            name : "Skippy",
            type : "HORSE",
            kit : "HorseArmorDmd",
            health : 100
        }
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
            uname: "King",
            name : "King",
            skin : "JCThePants",
            type : "PLAYER"
        },

        TELEPORT_WIZ : {
            uname: "TeleportWiz",
            name : "Teleport Wiz",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_1 : {
            uname : "CouncilMember1",
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_2 : {
            uname : "CouncilMember2",
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_3 : {
            uname : "CouncilMember3",
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_4 : {
            uname : "CouncilMember4",
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_5 : {
            uname : "CouncilMember5",
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_6 : {
            uname : "CouncilMember6",
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        },

        WIZARD_COUNCIL_MEMBER_7 : {
            uname : "CouncilMember7",
            name : "Council Member",
            skin : "jcThomasj",
            type : "PLAYER"
        }
    },

    npcEvents : {
        RIGHT_CLICK : "com.jcwhatever.nucleus.citizens.events.NPCRightClickEvent"
    }
};