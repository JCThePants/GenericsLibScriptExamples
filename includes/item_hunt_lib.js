
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

    return {

        // Spawn a random item from a pool of items
        spawnRandomFloatingItem: function (name, locations, callbacks) {
            if (locations.length == 0)
                return null;

            msg.debug("spawn floating item");

            var itemStack = quests.items.getItem(name);
            if (itemStack == null)
                return null;

            msg.debug("item stack found");

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
                for (var i=0; i < locations.length; i++) {
                    if (!isSpawned(_spawnedLocations[i])) {
                        location = _spawnedLocations[i];
                        break;
                    }
                }
            }

            if (location == null) {
                return null;
            }

            msg.debug("location found");

            callbacks = callbacks || {
                onPickup: null
            };

            var floatingItem = quests.items.createFloatingItem(itemStack, location);
            if (!floatingItem) {
                return null;
            }

            _spawnedLocations.push(location);

            floatingItem.spawn();

            msg.debug("spawned");

            if (callbacks.onPickup) {
                // handle player picking up item
                quests.items.onPickup(floatingItem, callbacks.onPickup);
            }

            return floatingItem;
        },

        // load all books
        getLocations: function (startsWith) {
            var items = [];

            // get secret library books
            var allitems = quests.locations.getScriptLocations();

            for (var i = 0; i < allitems.size(); i++) {

                var item = allitems.get(i);

                if (item.getName().startsWith(startsWith)) {
                    items.push(item.getLocation());
                }
            }

            return items;
        }
    };


}());



