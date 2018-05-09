MainApp.filter('myLimitTo', [function () {
    return function (obj, limit) {
        if (obj == null) {
            return [];
        }
        var keys = Object.keys(obj);
        if (keys.length < 1) {
            return [];
        }

        var ret = new Object,
        count = 0;
        angular.forEach(keys, function (key, arrayIndex) {
            if (count >= limit) {
                return false;
            }
            ret[key] = obj[key];
            count++;
        });
        return ret;
    };
}]);