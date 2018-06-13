MainApp.controller('AppCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {
        //Select sprint
        $scope.selectedSprint = {
            name: 'Select sprint',
            id: '-1'
        };
        //Previous sprint
        $scope.prevSprint = {
            name: 'Previous sprint',
            id: '-1'
        };

        $scope.query = '';
        $scope.res = {};
        $scope.totalPointsInProject = 0

        var currentPointsAccomplish = utils.createProgressBar("#currentPointsAccomplish", "#fb4869");
        var previousPointsAccomplish = utils.createProgressBar("#previousPointsAccomplish", "#42a5f5"); // progressbar.animate(value);


        //Graphs
        var areaDoneVsNotDone = graphService.Area.create('morris_area_chart1',
            null,
            'name', ['donePoints', 'notDonePoints'], ['Done', 'Not done'])
        var barChart;

        //Load sprints
        sprintDbController.getList()
            .safeApply($scope, function (result) {
                $scope.sprints = result;

                //Selected
                $scope.selectedSprint.name = result[0].name
                $scope.selectedSprint.id = result[0].id

                //previous
                $scope.prevSprint.name = result[1].name
                $scope.prevSprint.id = result[1].id

            })
            .subscribe(function (results) {
                console.log("sprints: ", results)
            }, function (e) {
                console.log("error: ", e)
            });


        //Load users
        userDbController.getList()
            .safeApply($scope, function (result) {
                $scope.users = result;
            })
            .subscribe(function (results) {
                    console.log("users: ", results)
                },
                function (e) {
                    console.log("error: ", e)
                });

        //Load projects
        projectDbController.getList()
            .map(projects => projects.sort(function (a, b) {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
            }))
            .digest($scope, 'projects')
            .subscribe(function (results) {
                    console.log("projects: ", results)
                },
                function (e) {
                    console.log("error: ", e)
                });


        //Observe chosen sprint
        $scope.$createObservableFunction('selected')
            .distinctUntilChanged()
            .safeApply($scope, function (result) {
                $scope.selectedSprint = result[0]
                $scope.prevSprint = result[1]
            })
            .subscribe(function (results) {
                //$("#sprint-list").removeClass("open");
            });

        //Observe chosen users
        var usersObservable = $scope.$createObservableFunction('onUserSelected')
            .safeApply($scope, function (result) {
                $scope.selectedUsers = result[0]
            })
            .debounce(800)
            .flatMap(items => Rx.Observable.from(items)
                .map(user => {
                    return {
                        id: user.id,
                        name: user.displayName
                    }
                })
                .toArray()
            )


        //Current sprint points
        observeOnScope($scope, 'selectedSprint')
            .combineLatest(usersObservable)
            .map(data => {
                return {
                    group: data[1],
                    sprintId: data[0].newValue.id + ""
                }
            })
            .flatMap(data => issueDbController.getSumOfGroup(data.group, data.sprintId))
            .safeApply($scope, function (result) {
                $scope.res = result
            })
            .subscribe(function (results) {
                console.log("results from combineLatest: ", results)

                // Create complete points 
                currentPointsAccomplish.animate(results.donePoints / results.sumAllPoints)


            }, function (e) {
                console.log("error: ", e)
            });


        //prev sprint points
        observeOnScope($scope, 'prevSprint')
            .combineLatest(usersObservable)
            .map(data => {
                if (data[0] != undefined && data[0].newValue != undefined && data[0].newValue.id != undefined)
                    return {
                        group: data[1],
                        sprintId: data[0].newValue.id + ""
                    }
                else
                    return {
                        group: data[1],
                        sprintId: "-1"
                    }

            })
            .flatMap(data => issueDbController.getSumOfGroup(data.group, data.sprintId))
            .safeApply($scope, function (result) {
                $scope.resPrev = result
            })
            .subscribe(function (results) {
                console.log("results from combineLatest prev sprint: ", results)

                previousPointsAccomplish.animate(results.donePoints / results.sumAllPoints)

            }, function (e) {
                console.log("error: ", e)
            });


        var graph;
        //Calculate recomended points per group
        observeOnScope($scope, 'selectedUsers')
            .combineLatest(usersObservable)
            .flatMap(data => issueDbController.getRecomndedPoints(data[1]))
            .safeApply($scope, function (result) {
                $scope.recomendedPoints = result.average
            })
            .subscribe(function (results) {

                console.log("Recomnded points for a group: ", results)

            }, function (e) {
                console.log("error: ", e)
            });


        //Calculate doneVsNotDone points per group
        observeOnScope($scope, 'selectedUsers')
            .combineLatest(usersObservable)
            .flatMap(data => issueDbController.graphData.commitmentVsCompleted(data[1]))
            .subscribe(function (results) {
                areaDoneVsNotDone.setData(results.sprints)
                console.log("doneVsNotDone points for a group: ", results)

            }, function (e) {
                console.log("error: ", e)
            });







        //Observe chosen project
        $scope.$createObservableFunction('onProjectSelected')
            .distinctUntilChanged()
            .safeApply($scope, function (result) {
                $scope.selectedProject = result[0]
                $scope.prevProject = result[1]
            })
            .combineLatest(usersObservable)
            .flatMap(data => {
                var users = data[1]
                if (users.length == 0) {
                    users = null
                }
                return issueDbController.graphData.getProjectAnalysis(data[0][0].id, users, null)
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