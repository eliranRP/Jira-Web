MainApp.controller('AppCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController', 'userDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController, userDbController) {
        //Select sprint
        $scope.selectedSprint = {
            name: 'Select sprint', id: '-1'
        };

        $scope.selectedUsers = [];
        $scope.select = '';
        $scope.query = '';




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





        function selectUser(user) {
            if (user.isSelected) {
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


        $scope.$createObservableFunction('sprintClick')
            .distinctUntilChanged()
            .safeApply($scope, function (result) {
                $scope.selectedSprint = result
            })
            .subscribe(function (results) {
                $("#sprint-list").removeClass("open");
            });



        var usersObservable = $scope.$createObservableFunction('click')
            .flatMapLatest(selectUser)
            .debounce(800)
            .flatMap(ignor => Rx.Observable.from($scope.selectedUsers)
                .map(user => {
                    return { id: user.id, name: user.displayName }
                })
                .toArray()
            )

        observeOnScope($scope, 'selectedSprint')
            .combineLatest(usersObservable)
            .map(data => {
                return { group: data[1], sprintId: data[0].newValue.id + "" }
            })
            .flatMap(data => issueDbController.getSumOfGroup(data.group, data.sprintId))
            .subscribe(function (results) {
                console.log("results from combineLatest: ", results)

                // Create complete points 
                utils.createProgressBar("#completedPoints", '#fb4869', results.donePoints / results.sumAllPoints)


            }, function (e) {
                console.log("error: ", e)
            });



        

    }]);
