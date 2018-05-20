MainApp.factory('utils', ['$rootScope', 'storageService',
    function ($rootScop, storageService) {

        var serviceObject = {
            loadJsonFromPromise: function (path) {
                return Rx.Observable.fromPromise($.getJSON(path, function (json) {
                    console.log("debugging", json)
                    return json
                }));
            },
            loadJson: function (path) {
                return $.getJSON(path, function (json) {
                    return json
                });
            },
            uploadFile: function (file, fileName) {
                //Return observable with file url after uploaded.
                return Rx.Observable.fromPromise(storageService.fileUpload(file, storeRef, fileName))
                    .flatMap(url => serviceObject.loadJson(url))
            }
        }

        return serviceObject;

    }]);