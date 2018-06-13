MainApp.factory('graphService', ['$rootScope', 'utils',
    function ($rootScop, utils) {
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
                        barColors: [MaterialLab.APP_COLORS.success, MaterialLab.APP_COLORS.mw_purple]
                    };
                    config.element = elementId;
                    return Morris.Area(config)
                },

            },
            Bar: {
                create: function conversionStats(labels, id, data, backgroundColor, borderColor) {
                    if ($('#' + id).length) {
                        var ctx = document.getElementById(id).getContext("2d");
                        var datasets = {
                            labels: labels,
                            datasets: [{
                                label: "",
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                borderWidth: 1,
                                data: data
                            }]
                        };
                        var barChartData = new Chart(ctx, {
                            type: "bar",
                            data: datasets,
                            responsive: true
                        });
                        return barChartData
                    };
                    return;
                }
            }

        }

        return serviceObject;

    }
]);