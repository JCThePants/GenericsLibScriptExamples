(function () {

    var tpWizardLocation = quests.locations.get(_locations.teleportation.NPC_TELEPORT_WIZARD);
    var spellLocation = quests.locations.get(_locations.teleportation.SPELL);
    var spellItemStack = quests.items.getItem(_itemNames.teleportation.SPELL);
    var spellItem = quests.items.createFloatingItem(spellItemStack, spellLocation);
    spellItem.spawn();

    phantom.entity.addEntity(spellItem.getEntity());

    var npc = npcs.create(_global.character.TELEPORT_WIZ.name, _global.character.TELEPORT_WIZ.type);
    var clickStatus = new StatusTracker();

    npc.getTraits().add("NpcTraitPack:Looking")
        .lookClose();

    npc.getTraits().setSkinName(_global.character.TELEPORT_WIZ.skin); // TODO ///////////////////
    npc.spawn(tpWizardLocation);

    /**
     * Right Click Teleport Wizard NPC
     */
    npc.onNpcRightClick(function (event) {

        var player = event.getPlayer();

        if (isTaskComplete(player, _tasks.teleportation.PICKUP_SPELL)) {
            npcTalk(player, _global.character.TELEPORT_WIZ.name, "YOU HAVE YOUR SPELL. NOW GET OUT!");
            return;
        }

        if (!isTaskComplete(player, _tasks.research.RESEARCH_COMPLETE) ||
            !isTaskComplete(player, _tasks.research.VOLCANO_ENTRANCE_DISCOVERY)) {

            npcTalk(player, _global.character.TELEPORT_WIZ.name, "GO AWAY!");
        }
        else {
            // player must click twice.
            var status = clickStatus.addStatus(player.getUniqueId());
            if (status.hasRejectedPlayer && !status.hasGivenSpell) {

                talkSession(player, function (talk) {

                    talk
                        .player(2, "Im sorry to bother you but I found a door...")

                        .npc(1, "Teleport Wiz", "You need a teleport spell. Take the one behind you and GO AWAY!");
                });

                status.hasGivenSpell = true;

                completeTask(player, _tasks.teleportation.TALK_TO_WIZARD);
            }
            else {
                npcTalk(player, _global.character.TELEPORT_WIZ.name, "Who are you! GO AWAY!");
                status.hasRejectedPlayer = true;

                setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "TP_PERSIST",
                    "Be persistent. Talk to the teleportation wizard again.");
            }

            if (status.hasGivenSpell) {
                phantom.entity.addViewer(player, spellItem.getEntity());

                setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "PICKUP_TP",
                    "Pickup the teleportation spell.");
            }
        }
    });

    /**
     * Detect player pickup teleport spell.
     */
    quests.items.onPickup(spellItem, function (player) {

        if (!isTaskComplete(player, _tasks.teleportation.TALK_TO_WIZARD) ||
            isTaskComplete(player, _tasks.teleportation.PICKUP_SPELL)) {
            return;
        }

        phantom.entity.removeViewer(player, spellItem.getEntity());

        completeTask(player, _tasks.teleportation.PICKUP_SPELL);

        msg.tell(player, "Picked up teleportation spell.");

        setObjective(player, _quests.SOURCE_OF_POWER.PART_1.quest, "TP_DOOR",
            "Go back to the doorway you found beneath the volcano.");

    });
}());