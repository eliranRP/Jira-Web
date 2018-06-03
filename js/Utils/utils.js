MainApp.factory('utils', ['$rootScope', 'storageService',
    function ($rootScop, storageService) {
        Array.prototype.sum = function () {
            sum = 0;
            for (i = 0; i < this.length; i++) {
                sum += Number(this[i]);
            }
            return sum;
        }
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
            createProgressBar: function (placeHolderId, color) {
                if ($(placeHolderId).length) {
                    var progressbar = new ProgressBar.Circle(placeHolderId, {
                        color: color,
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
                    return progressbar

                }
            },
            refresh: function cardRefresh() {
                $(document).on("click", card.cardRefresh, function (e) {
                    e.preventDefault();
                    var $card = $(this).closest(card.cardClass);
                    $card.append("<div class=\"load\"></div>");
                    var $loader = $card.find('.load');
                    $loader.load('assets/partials/_preloader.html', function () {
                        setTimeout(function () {
                            $loader.fadeOut('1500', function () {
                                $loader.remove();
                            });
                        }, 1700);
                    });
                });
            }

        }

        return serviceObject;

    }]);