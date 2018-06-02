MainApp.controller('LoadData', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {

        var sprints =
            [
                {
                    path: "../../../sprint_12_399.json",
                    id: "399",
                    name: "Sprint 13"
                },
                {
                    path: "../../../sprint_13_403.json",
                    id: "403",
                    name: "Sprint 13"
                },
                {
                    path: "../../../sprint_14_409.json",
                    id: "409",
                    name: "Sprint 14"
                },
                {
                    path: "../../../sprint_15_413.json",
                    id: "413",
                    name: "Sprint 15"
                },
                {
                    path: "../../../sprint_16_417.json",
                    id: "417",
                    name: "Sprint 16"
                },
                {
                    path: "../../../sprint_17_421.json",
                    id: "421",
                    name: "Sprint 17"
                },
                {
                    path: "../../../sprint_18_425.json",
                    id: "425",
                    name: "Sprint 18"
                }
            ];



        //Load issues
        //Rx.Observable.from(sprints)
        //    .flatMap(sprint => {
        //        return issueDbController.uploadSprint(sprint.path, sprint.id, sprint.name)
        //    })
        //    .subscribe(function (results) {
        //        console.log("results: ", results)
        //    }, function (e) {
        //        console.log("error: ", e)
        //    });



        //Load sprints

        //sprintDbController.uploadList("../../../projects.json")
        //     .subscribe(function (results) {
        //         console.log("results: ", results)
        //     }, function (e) {
        //         console.log("error: ", e)
        //      });


        //Load projects
        //projectDbController.uploadList("../../../projects.json")
        //    .subscribe(function (results) {
        //        console.log("results: ", results)
        //    }, function (e) {
        //        console.log("error: ", e)
        //    });

    }]);
