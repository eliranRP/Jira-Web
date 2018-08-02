
MainApp.controller('testCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {


        // var projectId = '10104';
        // // var group = [{id: "eliran"}, {id: "tavor cohen"},{id: "alon"},{id: "elad"},{id: "maorb"},{id: "matan"},{id: "tamara"}]
        // var group = [{
        //     id: "eliran"
        // }]
        // $scope.totalPointsInProject = 0



        // var barChart;

        // //Load projects
        // issueDbController.getPointsAfterSprintStarts(group)
        //     .subscribe(function (results) {
        //             console.log("projects: ", results)
        //         },
        //         function (e) {
        //             console.log("error: ", e)
        //         });




        var times = [{
                value: 0,
                time: 100
            },
            {
                value: 1,
                time: 600
            },
            {
                value: 2,
                time: 400
            },
            {
                value: 3,
                time: 900
            },
            {
                value: 4,
                time: 200
            }
        ];

        // Delay each item by time and project value;
        var source = Rx.Observable.from(times)
            .flatMap(function (item) {
                return Rx.Observable
                    .of(item.value)
                    .delay(item.time);
            })
            // .throttleFirst(3000 /* ms */ );

        var subscription = source.subscribe(
            function (x) {
                console.log('Next: %s', x);
            },
            function (err) {
                console.log('Error: %s', err);
            },
            function () {
                console.log('Completed');
            });
    }




]);