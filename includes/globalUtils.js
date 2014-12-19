
/**
 * Determine if two objects are equal. Javscript objects are compared
 * using javascript comparison. Java objects are compared using
 * the equals method.
 *
 * @returns {boolean}
 */
function isEqual(obj1, obj2) {
    if (isJavaObject(obj1)) {
        return obj1.equals(obj2);
    }
    else {
        return obj1 === obj2;
    }
}

/**
 * Determine if an object is a Java object.
 *
 * @returns {boolean}
 */
function isJavaObject(obj) {
    return obj instanceof java.lang.Object;
}

/**
 * Compare two locations to see if the block location
 * is the same.
 *
 * @returns {boolean}
 */
function isBlockLocationEqual(location1, location2) {
    return location1.getBlockX() == location2.getBlockX() &&
            location1.getBlockY() == location2.getBlockY() &&
            location1.getBlockZ() == location2.getBlockZ();
}

/**
 * Pick a random entry from an array.
 */
function arrayPick(array) {
    if (array.length == 1)
        return array[0];

    var index = rand.getIntMax(array.length);
    return array[index];
}

/**
 * Determine if an object is a Javascript or Java String.
 *
 * @returns {boolean}
 */
function isString(obj) {
    return typeof obj === "string" ||
        (isJavaObject(obj) &&
        obj.getClass().getName().equals("java.lang.String"));
}

/**
 * Convert a javascript array to an array list.
 */
Array.prototype.toList = function () {
    var list = new java.util.ArrayList(this.length);

    for (var i=0; i < this.length; i++) {
        list.add(this[i]);
    }

    return list;
};

/**
 * Simple key/value lookup.
 */
function JSMap() {

    var _map = [[/*Key*/], [/*Value*/]];

    this.put = function (key, value) {
        var index = getKeyIndex(key);

        if (index === null) {
            _map[0].push(key);
            _map[1].push(value);
            return null;
        }
        else {
            var previous = _map[1][index];
            _map[1][index] = value;
            return previous;
        }
    };

    this.get = function (key) {
        var index = getKeyIndex(key);
        if (index === null) {
            return null;
        }

        return _map[1][index];
    };

    this.remove = function (key) {
        var index = getKeyIndex(key);
        if (index === null) {
            return null;
        }

        _map[0].splice(index, 1);
        return _map[1].splice(index, 1)[0];
    };

    this.containsKey = function (key) {
        return getKeyIndex(key) !== null;
    };

    this.values = function() {
        var result = [];
        for (var i=0; i < _map[1].length; i++) {
            result.push(_map[1][i]);
        }
        return result;
    };

    this.keys = function() {
        var result = [];
        for (var i=0; i < _map[0].length; i++) {
            result.push(_map[0][i]);
        }
        return result;
    };

    function getKeyIndex(key) {
        for (var i=0; i < _map[0].length; i++) {
            if (isEqual(_map[0][i], key)) {
                return i;
            }
        }

        return null;
    }
}