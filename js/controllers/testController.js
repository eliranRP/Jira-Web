MainApp.controller('testCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {


        var projectId = '10104';
        // var group = [{id: "eliran"}, {id: "tavor cohen"},{id: "alon"},{id: "elad"},{id: "maorb"},{id: "matan"},{id: "tamara"}]
        var group = [{id: "eliran"}]
        $scope.totalPointsInProject = 0



        var barChart;

        //Load projects
        issueDbController.getPointsAfterSprintStarts(group)
            .subscribe(function (results) {
                    console.log("projects: ", results)
                },
                function (e) {
                    console.log("error: ", e)
                });


    }
]);