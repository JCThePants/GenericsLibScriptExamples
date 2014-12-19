/**
 * Determine if a session task is complete by checking the task name
 * from the arena players session meta.
 *
 * @param arenaPlayer  Player object or ArenaPlayer object.
 * @param taskName     The name of the task.
 *
 * @returns {boolean}  True if flag is set in players arena session meta.
 */
function isSessionTaskComplete(arenaPlayer, taskName) {
    arenaPlayer = pvstar.players.get(arenaPlayer);
    return arenaPlayer.getSessionMeta().get(taskName) == true;
}

/**
 * Set a task flag in the arena players session meta.
 *
 * @param arenaPlayer  Player object or ArenaPlayer object.
 * @param taskName     The name of the task.
 */
function completeSessionTask(arenaPlayer, taskName) {
    arenaPlayer = pvstar.players.get(arenaPlayer);
    return arenaPlayer.getSessionMeta().set(taskName, true);
}
