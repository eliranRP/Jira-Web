MainApp.controller('AppCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController', 'userDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController, userDbController) {
        //Select sprint
        $scope.selectedSprint = {
            name: 'Select sprint', id: '-1'
        };

        $scope.selectedUsers = [];
        $scope.select = '';
        $scope.query = '';
        $scope.res = {};

        var currentPointsAccomplish = utils.createProgressBar("#currentPointsAccomplish", "#fb4869");
        var previousPointsAccomplish = utils.createProgressBar("#previousPointsAccomplish", "#42a5f5");// progressbar.animate(value);


        //issueDbController.uploadSprint("../../../sprint_test.json", "421")
        //    .subscribe(function (results) {
        //        console.log("results: ", results)
        //    }, function (e) {
        //        console.log("error: ", e)
        //    });



        //Load sprints
        sprintDbController.getList()
            .safeApply($scope, function (result) {
                $scope.sprints = result;
                $scope.selectedSprint.name = result[0].name
                $scope.selectedSprint.id = result[0].id

            })
            .subscribe(function (results) {
                console.log("results: ", results)
            }, function (e) {
                console.log("error: ", e)
            });


        //Load users
        userDbController.getList()
            .digest($scope, 'users')
            .subscribe(function (results) {
                $scope.users = results
                console.log("results: ", results)
            },
            function (e) {
                console.log("error: ", e)
            });



        function contain(array, item) {

            var found = false;
            var position = -1;
            for (var i = 0; i < array.length; i++) {
                if (array[i].accountId == item.accountId) {
                    found = true;
                    position = i;
                    break;
                }
            }
            return { isFound: found, position: position }
        }


        //Create selected users array
        function selectUser(user) {
            isContain = contain($scope.selectedUsers, user)
            if (user.isSelected) {
                if (!isContain.isFound)
                    $scope.selectedUsers.push(user);
            } else {

                for (var i = 0; i < $scope.selectedUsers.length; i++) {
                    if ($scope.selectedUsers[i].id == user.id) {
                        $scope.selectedUsers.splice(i, 1);
                    }
                }
            }
            return Rx.Observable
                .just($scope.selectedUsers)
        }

        //Observe chosen sprint
        $scope.$createObservableFunction('sprintClick')
            .distinctUntilChanged()
            .safeApply($scope, function (result) {
                $scope.selectedSprint = result[0]
                $scope.prevSprint = result[1]
            })
            .subscribe(function (results) {
                $("#sprint-list").removeClass("open");
            });


        //Observe chosen users
        var usersObservable = $scope.$createObservableFunction('click')
            .flatMapLatest(selectUser)
            .debounce(800)
            .flatMap(ignor => Rx.Observable.from($scope.selectedUsers)
                .map(user => {
                    return { id: user.id, name: user.displayName }
                })
                .toArray()
            )


        //Current sprint points
        observeOnScope($scope, 'selectedSprint')
            .combineLatest(usersObservable)
            .map(data => {
                return { group: data[1], sprintId: data[0].newValue.id + "" }
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
                    return { group: data[1], sprintId: data[0].newValue.id + "" }
                else
                    return { group: data[1], sprintId: "-1" }

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


    }]);
