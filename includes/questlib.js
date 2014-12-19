var _questLib_internal = {
    onScriptReset : [],
    talkSessions : new StatusTracker()
};

/**
 * Determine if the specified quest has been accepted by a player.
 *
 * @param player     The player to check.
 * @param questName  The name of the quest.
 * @returns {Boolean}  True if the quest is accepted.
 */
function isQuestAccepted(player, questName) {
    return quests.isInQuest(player, questName);
}

/**
 * Query a player to accept a quest.
 *
 * @param player     The player to query.
 * @param questName  The name of the quest.
 * @param callback   The callback to run if the quest is accepted.
 */
function queryQuest(player, questName, callback) {
    quests.queryQuest(player, questName, function () {

        if (callback)
            callback();
    });
}

/**
 * Join a player to a quest.
 *
 * @param player     The player.
 * @param questName  The name of the quest.
 *
 * @returns {boolean}  True if the player joined the quest.
 */
function joinQuest(player, questName) {
    return quests.joinQuest(player, questName);
}

/**
 * Determine if the player has completed a quest.
 *
 * @param player     The player.
 * @param questName  The name of the quest.
 *
 * @returns {Boolean}  True if the player has completed the quest.
 */
function isQuestComplete(player, questName) {
    return quests.hasCompleted(player, questName);
}

/**
 * Determine if the player is currently in quest.
 *
 * @param player     The player.
 * @param questName  The name of the quest.
 *
 * @returns {Boolean}  True if the player in quest.
 */
function isCurrentQuest(player, questName) {
    return isQuestAccepted(player, questName) &&
        !isQuestComplete(player, questName);
}

/**
 * Set the players quest status to completed.
 *
 * @param player     The player.
 * @param questName  The name of the quest.
 *
 * @returns {Boolean}  True if the quest completed.
 */
function completeQuest(player, questName) {
    return quests.complete(player, questName);
}

/**
 * Determine if the player has completed a task.
 *
 * @param player       The player.
 * @param questName    The name of the quest.
 * @param taskName     The name of the task.
 * @param subTaskName  Optional. A sub task name.
 *
 * @returns {Boolean}  True if the task is complete.
 */
function isTaskComplete(player, questName, taskName, subTaskName) {
    if(Object.prototype.toString.call( questName ) === '[object Array]' ) {
        taskName = questName[1];
        subTaskName = questName[2];
        questName = questName[0];
    }

    var name = taskName;
    if (subTaskName) {
        name += "_" + subTaskName;
    }
    return quests.flags.has(player, questName, name);
}

/**
 * Mark a task as completed for the specified player.
 *
 * @param player       The player.
 * @param questName    The name of the quest.
 * @param taskName     The name of the task.
 * @param subTaskName  Optional. A sub task name.
 */
function completeTask(player, questName, taskName, subTaskName) {
    if(Object.prototype.toString.call( questName ) === '[object Array]' ) {
        taskName = questName[1];
        subTaskName = questName[2];
        questName = questName[0];
    }

    var name = taskName;
    if (subTaskName) {
        name += "_" + subTaskName;
    }
    quests.flags.set(player, questName, name);
}

/**
 * Mark a task as incomplete for the specified player.
 *
 * @param player       The player.
 * @param questName    The name of the quest.
 * @param taskName     The name of the task.
 * @param subTaskName  Optional. A sub task name.
 */
function clearTask(player, questName, taskName, subTaskName) {
    if(Object.prototype.toString.call( questName ) === '[object Array]' ) {
        taskName = questName[1];
        subTaskName = questName[2];
        questName = questName[0];
    }

    var name = taskName;
    if (subTaskName) {
        name += "_" + subTaskName;
    }
    quests.flags.clear(player, questName, name);
}

function takeItem(player, itemName, qty) {
    qty = qty || 255;

    var itemStack = quests.items.getItem(itemName);
    inventory.remove(player.getInventory(), itemStack, inventory.getDefaultComparer(), 255);
}

/**
 * Teleport a player to an ArborianQuest location.
 *
 * @param player        The player to teleport
 * @param locationName  The name of the ArborianQuest location.
 */
function questTeleport(player, locationName) {
    var location = quests.locations.get(locationName);
    if (location == null) {
        msg.debug("Failed to find location: " + locationName);
        return;
    }

    player.teleport(location);
}


function failedToFindLocation(locationName) {
    msg.debug("Failed to find quest location: " + locationName);
}

function onScriptReset(func) {

    msg.debug("Script reset");

    if (func) {
        _questLib_internal.onScriptReset.push(func);
    }
    else {
        for (var i=0; i < _questLib_internal.onScriptReset.length; i++) {
            var f = _questLib_internal.onScriptReset.pop();
            f();
        }
    }
}