MainApp.factory('graphService', ['$rootScope', 'utils',
    function ($rootScop, utils) {
        Object.byString = function (o, s) {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            var a = s.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
            return o;
        }
        var serviceObject = {
            Area: {
                create: function (elementId, data, xKey, yKey, labels) {
                    var config = {
                        data: data,
                        xkey: xKey,
                        ykeys: yKey,
                        labels: labels,
                        fillOpacity: 0.6,
                        hideHover: 'auto',
                        behaveLikeLine: true,
                        resize: true,
                        parseTime: false,
                        pointFillColors: ['#ffffff'],
                        pointStrokeColors: ['black'],
                        lineColors: [MaterialLab.APP_COLORS.success, MaterialLab.APP_COLORS.mw_purple],
                        barColors: [MaterialLab.APP_COLORS.success,MaterialLab.APP_COLORS.mw_purple]
                    };
                    config.element = elementId;
                    return Morris.Area(config)
                },

            }

        }

        return serviceObject;

    }]);