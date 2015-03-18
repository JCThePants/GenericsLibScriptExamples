(function () {

    var responses = {

        npcs : {

            tellKing: [
                ["WHAT! There's never been any zombies in Arboria.",
                    "... unless you believe old legends.",
                    "{GREEN}You should tell the king immediately."],
                ["You're being ridiculous.",
                    "There's never been any zombies in Arboria.",
                    "Are you drunk?"],
                ["Go home. You're drunk."],
                ["I've only ever heard of zombies in the other realm.",
                    "Have you had you're eyes checked lately?"],
                ["I had a nightmare about zombies chasing me once."],
                ["That's nice."],
                ["{GREEN}Maybe you should tell the King."],
                ["Stop eating the shrooms."]
            ],

            findTheCouncil: [
                ["The Council of Wizards convenes at the very top of the Great Tree."],
                ["Im busy. Leave me alone."],
                ["Do I look like the Council of Wizards."],
                ["You can find them at the top of the Great Tree."],
                ["The Council of Wizards convenes at the Great Tree."]
            ]
        },

        king : {

            postOrderPickup : [
                ["Hurry up."],
                ["Get those orders to the Council of Wizards."],
                ["What are you standing around for."],
                ["Get going before I have you flogged."],
                ["Time is of the essence."],
                ["Get going!"]
            ]

        }

    };

    var ordersLocation = quests.locations.get(_locations.tellTheKing.KING_GIVE);
    var ordersItemStack = quests.items.getItem(_itemNames.tellTheKing.KINGS_ORDERS);
    var ordersItem = quests.items.createFloatingItem(ordersItemStack, ordersLocation);

    ordersItem.spawn(ordersLocation);
    phantom.entity.addEntity(ordersItem.getEntity());

    /**
     * Right click any NPC
     */
    events.on(_bukkitEvents.NPC_RIGHT_CLICK, "HIGHEST", function(event) {

        var player = event.getPlayer();
        var npc = event.getNpc();

        if (npc == _global.npc.KING.getHandle())
            return;

        if (isTalking(player) || !isInTask(player)) {
            return;
        }

        var npcName = npc.getName();

        // prevent other quest actions
        event.setCancelled(true);

        // TODO: need to be able to get script NPC from script
        // TODO: Make sure NPC is a living NPC

        if (!isTaskComplete(player, _tasks.tellTheKing.PICKUP_ORDERS)) {
            // * NPC's direct player to tell the king or are in disbelief.

            talkSession(player, function (talk) {

                talk.player(4, "I saw zombies under the volcano!");

                talk.npc(5, npc.getName(), arrayPick(responses.npcs.tellKing));
            });

            completeTask(player, _tasks.tellTheKing.TELL_SOMEONE);
        }
        else {
            // NPC's direct player to the Great Tree

            talkSession(player, function (talk) {

                talk.player(4, "I need to get these orders to the Council of Wizards.");

                talk.npc(5, npc.getName(), arrayPick(responses.npcs.findTheCouncil));
            });
        }
    });

    /**
     * Right click the King NPC
     */
    _global.npc.KING.onNpcRightClick(function (event) {

        var player = event.getPlayer();

        if (isTalking(player) || !isInTask(player))
            return;

        // make sure the player hasn't already told the king
        if (isTaskComplete(player, _tasks.tellTheKing.TELL_THE_KING)) {

            //if (! TEll the council) {
            npcTalk(player, _global.character.KING.name, arrayPick(responses.king.postOrderPickup));
            //}

            return;
        }

        talkSession(player, function (talk) {

            talk
                .player(3, "Sire! I saw zombies behind a door beneath the volcano!")

                .npc(2, _global.character.KING.name, "WHAT! No. No. No. This can't be.")
                .npc(2, _global.character.KING.name, "We must seal the door!")
                .npc(2, _global.character.KING.name, "No wait!")
                .npc(5, _global.character.KING.name, "If the portal to the other realm is also damaging our realm...")
                .npc(4, _global.character.KING.name, "...then sealing the door wont help.")
                .npc(3, _global.character.KING.name, "This is a magic beyond me.")
                .npc(4, _global.character.KING.name, "Let the Council of Wizards decide what to do.")
                .npc(2, _global.character.KING.name, "{GREEN}You will take these orders to the council.")
                .npc(1, _global.character.KING.name, "Go. QUICKLY!")

                .execute(function () {
                    phantom.entity.addViewer(player, ordersItem.getEntity());
                    completeTask(player, _tasks.tellTheKing.TELL_THE_KING);

                    setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "PICKUP_MESSAGE",
                        "Pickup the orders from the king.");
                });
        });
    });

    /**
     * Detect pickup the Kings orders.
     */
    quests.items.onPickup(ordersItem, function (player) {

        if (!isInTask(player))
            return;

        // make sure the player hasn't already picked up the orders
        if (isTaskComplete(player, _tasks.tellTheKing.PICKUP_ORDERS)) {
            return;
        }

        // make sure the player hasn't already picked up the orders
        if (isTaskComplete(player, _tasks.tellTheKing.PICKUP_ORDERS) ||
            !isTaskComplete(player, _tasks.tellTheKing.TELL_THE_KING)) {
            return;
        }

        msg.tell(player, "Picked up the Kings Orders to the Council of Wizards.");

        completeTask(player, _tasks.tellTheKing.PICKUP_ORDERS);

        phantom.entity.removeViewer(player, ordersItem.getEntity());

        setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "SEND_MESSAGE",
            "Take the Kings orders to the Council of Wizards located at the top of the Great Tree.");
    });

    // Util: Determine if the player is currently in the "Tell The King" task.
    function isInTask(player) {

        // make sure the player is in the source of power quest
        if (!isCurrentQuest(player, _quests.SOURCE_OF_POWER.PART_1.quest)) {
            return false;
        }

        // make sure player is supposed to tell the king
        if (!isTaskComplete(player, _tasks.volcano.VISIT_LARGE_DOOR)) {
            return false;
        }

        return true;
    }

}());