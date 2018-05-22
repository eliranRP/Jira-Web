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
            },

            createProgressBar: function (placeHolderId, color, value) {
                if ($(placeHolderId).length) {
                    var progressbar = new ProgressBar.Circle(placeHolderId, {
                        color: '#fb4869',
                        strokeWidth: 3,
                        trailWidth: 3,
                        duration: 1500,
                        text: {
                            value: '0%'
                        },
                        step: function step(state, bar) {
                            bar.setText((bar.value() * 100).toFixed(0) + "%");
                        }
                    });
                    if (value > 1) {
                        value /= 100;
                    }
                    return progressbar
                }
            }

        }

        return serviceObject;

    }]);