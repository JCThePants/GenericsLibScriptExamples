
function StatusTracker () {

    var _statusArray = [];

    /* Class Object */
    function Status (id) {

        this.id = id;
    }

    this.getStatus = function (id) {

        for (var i=0; i < _statusArray.length; i++) {
            var status = _statusArray[i];

            if (isEqual(status.id, id)) {
                return status;
            }
        }

        return null;
    };

    this.addStatus = function (id) {

        var status = this.getStatus(id);
        if (status != null) {
            return status;
        }

        status = new Status(id);

        _statusArray.push(status);

        return status;
    };

    this.removeStatus = function (id) {
        for (var i=0; i < _statusArray.length; i++) {
            var status = _statusArray[i];

            if (isEqual(status.id, id)) {
                _statusArray.splice(i, 1);
                return true;
            }
        }

        return false;
    };

    this.clearStatus = function (id) {
        for (var i=0; i < _statusArray.length; i++) {
            var status = _statusArray[i];

            if (isEqual(status.id, id)) {
                _statusArray[i] = new Status(id);
                return true;
            }
        }

        return false;
    };

    function isEqual(obj1, obj2) {
        if (isJavaObject(obj1)) {
            return obj1.equals(obj2);
        }
        else {
            return obj1 === obj2;
        }
    }

    function isJavaObject(obj) {
        return obj instanceof java.lang.Object;
    }
}


