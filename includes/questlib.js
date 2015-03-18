var _questLib_internal = {
    onScriptReset : [],
    talkSessions : new StatusTracker(),

    getQuestPath : function (quest) {
        if (isArray(quest)) {

            var path = "";
            for (var i=0; i < quest.length; i++) {
                path += quest[i];
                if (i < quest.length - 1)
                    path += '.';
            }
            return path;
        }
        return quest;
    },

    getTaskName : function (task) {
        if (isArray(task)) {
            var taskName = "";
            for (var i=0; i < task.length; i++) {
                taskName += task[i];
                if (i < task.length - 1)
                    taskName += '_';
            }
            return taskName;
        }
        return task;
    },

    getTaskObject : function (questPath, taskName) {

        var path;
        var task;

        if (!questPath)
            throw "Invalid quest path";

        if (!isArray(questPath) && !isString(questPath)) {

            path = _questLib_internal.getQuestPath(questPath.path);
            task = _questLib_internal.getTaskName(questPath.task);
        }
        else if (isArray(questPath)) {
            path = _questLib_internal.getQuestPath(questPath);
        }
        else {
            path = questPath;
        }

        if (taskName) {
            task = _questLib_internal.getTaskName(taskName);
        }

        return {
            questPath : path,
            taskName : task
        }
    }
};

/**
 * Determine if the specified quest has been accepted by a player.
 *
 * @param player  The player to check.
 * @param questPath   The name of the quest or quest array.
 *
 * @returns {Boolean}  True if the quest is accepted.
 */
function isQuestAccepted(player, questPath) {

    var path = _questLib_internal.getQuestPath(questPath);

    return quests.isInQuest(player, path);
}

/**
 * Query a player to accept a quest.
 *
 * @param player     The player to query.
 * @param questPath      The name of the quest or quest array.
 * @param callback   The callback to run if the quest is accepted.
 */
function queryQuest(player, questPath, callback) {

    var path = _questLib_internal.getQuestPath(questPath);

    quests.queryQuest(player, path, function () {

        if (callback)
            callback();
    });
}

/**
 * Join a player to a quest.
 *
 * @param player  The player.
 * @param questPath   The name of the quest or quest array.
 *
 * @returns {boolean}  True if the player joined the quest.
 */
function joinQuest(player, questPath) {

    var path = _questLib_internal.getQuestPath(questPath);

    return quests.joinQuest(player, path);
}

/**
 * Determine if the player has completed a quest.
 *
 * @param player  The player.
 * @param questPath   The name of the quest or quest array.
 *
 * @returns {Boolean}  True if the player has completed the quest.
 */
function isQuestComplete(player, questPath) {

    var path = _questLib_internal.getQuestPath(questPath);

    return quests.hasCompleted(player, path);
}

/**
 * Determine if the player is currently in quest.
 *
 * @param player  The player.
 * @param questPath   The name of the quest or quest array.
 *
 * @returns {Boolean}  True if the player in quest.
 */
function isCurrentQuest(player, questPath) {
    return isQuestAccepted(player, questPath) &&
        !isQuestComplete(player, questPath);
}

/**
 * Set the players quest status to completed.
 *
 * @param player     The player.
 * @param questPath  The name of the quest or quest array.
 *
 * @returns {Boolean}  True if the quest completed.
 */
function completeQuest(player, questPath) {

    var path = _questLib_internal.getQuestPath(questPath);

    return quests.complete(player, path);
}

/**
 * Get the players current objective for the specified quest.
 *
 * @param player     The player to check.
 * @param questPath  The path of the quest to check.
 */
function getObjective(player, questPath) {

    var path = _questLib_internal.getQuestPath(questPath);

    return quests.getObjective(player, path);
}

/**
 * Set the players current objective for the specified quest.
 *
 * @param player     The player to set the objective for.
 * @param questPath  The path of the quest to set the objective for.
 * @param key        The objective text key.
 * @param text       The objective text.
 */
function setObjective(player, questPath, key, text) {

    var path = _questLib_internal.getQuestPath(questPath);

    quests.setObjective(player, path, key, text);
}

/**
 * Clear a players current objective for the specified quest.
 *
 * @param player     The player to clear the objective for.
 * @param questPath  The path of the quest to clear the objective from.
 */
function clearObjective(player, questPath) {

    var path = _questLib_internal.getQuestPath(questPath);

    quests.clearObjective(player, path);
}

/**
 * Determine if the player has completed a task.
 *
 * @param player      The player.
 * @param questPath   The name of the quest.
 * @param taskName    The name of the task.
 *
 * @returns {Boolean}  True if the task is complete.
 */
function isTaskComplete(player, questPath, taskName) {
    var info = _questLib_internal.getTaskObject(questPath, taskName);
    return quests.flags.has(player, info.questPath, info.taskName);
}

/**
 * Mark a task as completed for the specified player.
 *
 * @param player     The player.
 * @param questPath  The name of the quest.
 * @param taskName   The name of the task.
 */
function completeTask(player, questPath, taskName) {
    var info = _questLib_internal.getTaskObject(questPath, taskName);
    quests.flags.set(player, info.questPath, info.taskName);
}

/**
 * Mark a task as incomplete for the specified player.
 *
 * @param player     The player.
 * @param questPath  The name of the quest.
 * @param taskName   The name of the task.
 */
function clearTask(player, questPath, taskName) {
    var info = _questLib_internal.getTaskObject(questPath, taskName);
    quests.flags.clear(player, info.questPath, info.taskName);
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