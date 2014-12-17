
(function () {

    var tpWizardLocation = quests.locations.get("SoP_TPWizard");
    var spellLocation = quests.locations.get("SoP_TPWizard_Spell");
    var spellItemStack = quests.items.getItem("SoP_TPWizard_Spell");
    var spellItem = quests.items.createFloatingItem(spellItemStack, spellLocation);
    spellItem.spawn();

    phantom.entity.addEntity(spellItem.getEntity());

    var npc = citizens.createNPC(_global.character.TELEPORT_WIZ.name, _global.character.TELEPORT_WIZ.type);

    var clickStatus = new StatusTracker();

    var lookingTrait = npc.addTrait(citizensUtils.traits.LOOKING);
    lookingTrait.setLookMode("LOOK_CLOSE");
    lookingTrait.setEnabled(true);

    npc.setSkinName(_global.character.TELEPORT_WIZ.skin);

    npc.spawn(tpWizardLocation);

    // Setup NPC RIGHT CLICK
    citizens.on(npc, _global.npcEvents.RIGHT_CLICK, "NORMAL", function (event) {
        var player = event.getClicker();

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

                playerTalk(player, "Im sorry to bother you but I found a door...");

                npcTalk(player, 1, "Teleport Wiz", "You need a teleport spell. Take the one behind you and GO AWAY!");
                status.hasGivenSpell = true;
                completeTask(player, _tasks.teleportation.TALK_TO_WIZARD);
            }
            else {
                npcTalk(player, _global.character.TELEPORT_WIZ.name, "Who are you! GO AWAY!");
                status.hasRejectedPlayer = true;
            }

            if (status.hasGivenSpell) {
                phantom.entity.addViewer(player, spellItem.getEntity());
            }
        }
    });

    quests.items.onPickup(spellItem, function (player, item, isCancelled) {

        if (!isTaskComplete(player, _tasks.teleportation.TALK_TO_WIZARD) ||
            isTaskComplete(player, _tasks.teleportation.PICKUP_SPELL)) {
            return;
        }

        phantom.entity.removeViewer(player, item.getEntity());

        completeTask(player, _tasks.teleportation.PICKUP_SPELL);

        msg.tell(player, "Picked up teleportation spell.");
    });
}());