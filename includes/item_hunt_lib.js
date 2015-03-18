
var itemHunt = (function () {

    var _spawnedLocations = [];

    function isSpawned(location) {
        for (var i=0; i < _spawnedLocations.length; i++) {
            if (_spawnedLocations[i].equals(location)) {
                return true;
            }
        }
        return false;
    }

    function getPickupCallback(callbacks, floatingItem) {
        return function (player) {
            callbacks.onPickup(player, floatingItem);
        }
    }

    return {

        /**
         * Spawn a floating item in a random location using a pool of locations.
         *
         * @param name       The name of the floating item to spawn.
         * @param locations  The pool of locations to use.
         * @param callbacks  Optional object of callbacks.
         * @param count      Optional number of locations to use. Default is 1.
         *
         * @returns {Array} Array of spawned floating items
         */
        spawnFloatingItem: function (name, locations, callbacks, count /*Optional. default is 1*/) {

            count = count || 1;

            if (locations.length == 0)
                return null;

            var itemStack = quests.items.getItem(name);
            if (itemStack == null)
                return null;

            callbacks = callbacks || {
                onPickup: null
            };

            var items = [];

            for (var counter=0; counter < count; counter++) {

                var location = null;

                for (var tries = 0; tries < locations.length; tries++) {

                    var index = rand.getIntMax(locations.length);
                    var loc = locations[index];

                    if (!isSpawned()) {
                        location = loc;
                        break;
                    }
                }


                if (location == null) {
                    for (var i = 0; i < locations.length; i++) {
                        if (!isSpawned(_spawnedLocations[i])) {
                            location = _spawnedLocations[i];
                            break;
                        }
                    }
                }

                if (location == null) {
                    return null;
                }

                var floatingItem = quests.items.createFloatingItem(itemStack, location);
                if (!floatingItem) {
                    return null;
                }

                _spawnedLocations.push(location);

                floatingItem.spawn();

                if (callbacks.onPickup) {
                    // handle player picking up item
                    var func = getPickupCallback(callbacks, floatingItem);
                    quests.items.onPickup(floatingItem, func);
                }

                items.push(floatingItem);
            }

            return items;
        },

        /**
         * Get all locations from the ArborianQuest plugin that start with the specified string.
         *
         * @param startsWith  The search text.
         *
         * @returns {Array}  An array of locations
         */
        getLocations: function (startsWith) {
            var results = [];

            // get all locations
            var allLocations = new java.util.ArrayList(quests.locations.getScriptLocations());

            for (var i = 0; i < allLocations.size(); i++) {

                var item = allLocations.get(i);

                if (item.getName().startsWith(startsWith)) {
                    results.push(item.getLocation());
                }
            }

            return results;
        }
    };

}());



