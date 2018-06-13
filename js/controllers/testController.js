MainApp.controller('testCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {


        var projectId = '10104';
        var group = [{
            id: "eliran"
        }, {
            id: "tavor cohen"
        }]
        $scope.totalPointsInProject = 0



        var barChart;

        //Load projects
        projectDbController.getList()
            .digest($scope, 'projects')
            .subscribe(function (results) {
                    console.log("projects: ", results)
                },
                function (e) {
                    console.log("error: ", e)
                });

        //Observe chosen project
        $scope.$createObservableFunction('onProjectSelected')
            .distinctUntilChanged()
            .safeApply($scope, function (result) {
                $scope.selectedProject = result[0]
                $scope.prevProject = result[1]
            })
            .flatMap(ignore => {
                return issueDbController.graphData.getProjectAnalysis($scope.selectedProject.id, null, null)
            })
            .safeApply($scope, function (result) {
                $scope.totalPointsInProject = result.totalPoints
            })
            .subscribe(function (results) {
                console.log("All: ", results)
                if (barChart == undefined) {
                    barChart = graphService.Bar.create(results.labels, 'conversionStats1', results.data, results.backgroundColor, results.borderColor)
                } else {
                    barChart.data.labels = results.labels
                    barChart.data.datasets[0].data = results.data
                    barChart.data.datasets[0].backgroundColor = results.backgroundColor
                    barChart.data.datasets[0].borderColor = results.borderColor
                    barChart.data.datasets[0].label = $scope.selectedProject.name
                    barChart.update();
                }



            });


    }
]);