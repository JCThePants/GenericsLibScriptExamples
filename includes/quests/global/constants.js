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

var _itemNames = {
    SOUL_KEY : "WizardForest_Key"
};

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