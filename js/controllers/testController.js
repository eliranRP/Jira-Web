MainApp.controller('testCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {



        //Load users
        userDbController.getList()
            .digest($scope, 'users')
            .subscribe(function (results) {
                $scope.users = results
                console.log("users: ", results)
            },
            function (e) {
                console.log("error: ", e)
            });

        //$scope.selectedUsers = function (message) {
        //    $scope.current = message;
        //    console.log("message: ", message)

        //}


        //Observe chosen users
        var usersObservable = $scope.$createObservableFunction('selectedU')
            .map(message => {
                console.log("messgaeC:", message)
                return message;
            })
            .debounce(800)
            .flatMap(message => Rx.Observable.from(message)
                .map(user => {
                    return { id: user.id, name: user.displayName }
                })
                .toArray()
            ).subscribe(function (results) {
                console.log("results from combineLatest: ", results)



            }, function (e) {
                console.log("error: ", e)
            });

        ////Load sprints
        //sprintDbController.getList()
        //    .safeApply($scope, function (result) {
        //        $scope.sprints = result;
        //    })
        //    .subscribe(function (results) {
        //        console.log("sprints: ", results)
        //    }, function (e) {
        //        console.log("error: ", e)
        //    });


        //////$scope.selected = function (current, previous) {
        //////    $scope.current = current;
        //////    console.log("message: ", current, previous)

        //////}


        ////Observe chosen sprint
        //$scope.$createObservableFunction('selected')
        //    .distinctUntilChanged()
        //    .safeApply($scope, function (result) {
        //        $scope.selectedSprint = result[0]
        //        $scope.prevSprint = result[1]
        //    })
        //    .subscribe(function (results) {
        //        $("#sprint-list").removeClass("open");
        //    });

    }]);
