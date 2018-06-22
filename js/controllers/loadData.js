MainApp.controller('LoadData', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {

        var sprints = [
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
            },
            {
                path: "../../../sprint_19_431.json",
                id: "431",
                name: "Sprint 19"
            },
            {
                path: "../../../sprint_20_436.json",
                id: "436",
                name: "Sprint 20"
            },
            {
                path: "../../../sprint_21_439.json",
                id: "439",
                name: "Sprint 21"
            }
        ];

        console.table(sprints, ['path', 'id', 'name'])
        console.log("hii there")


        // // //Load issues
        // Rx.Observable.from(sprints)
        //    .flatMap(sprint => {
        //        return issueDbController.uploadSprint(sprint.path, sprint.id, sprint.name)
        //    })
        //    .subscribe(function (results) {
        //        console.log("results: ", results)
        //    }, function (e) {
        //        console.log("error: ", e)
        //    });



        //    //Load sprints

        //     sprintDbController.uploadList("../../../sprint_list.json")
        //         .subscribe(function (results) {
        //             console.log("results: ", results)
        //         }, function (e) {
        //             console.log("error: ", e)
        //          });


        //    // Load projects
        //     projectDbController.uploadList("../../../projects.json")
        //        .subscribe(function (results) {
        //            console.log("results: ", results)
        //        }, function (e) {
        //            console.log("error: ", e)
        //        });



        //     //Load users
        //    userDbController.createListFrom("issue")
        //        .subscribe(function (results) {
        //            console.log("results: ", results)
        //        }, function (e) {
        //            console.log("error: ", e)
        //        });


    }
]);