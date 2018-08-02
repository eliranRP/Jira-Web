MainApp.controller('LoadData', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {

        var sprints = [{
                path: "../../sprint_16_417.json",
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
            },
            {
                path: "../../../sprint_22_443.json",
                id: "443",
                name: "Sprint 22"
            },
            {
                path: "../../../sprint_23_448.json",
                id: "448",
                name: "Sprint 23"
            },
            {
                path: "../../../sprint_24_454.json",
                id: "454",
                name: "Sprint 24"
            },
            {
                path: "../../../sprint_25_456.json",
                id: "456",
                name: "Sprint 25"
            },
            {
                path: "../../sprint_26_460.json",
                id: "460",
                name: "Sprint 26"
            },
            {
                path: "../../../sprint_27_470.json",
                id: "470",
                name: "Sprint 27"
            }
        ];

        // console.table(sprints, ['path', 'id', 'name'])
        // console.log("hii there")


        //#####  Load first(1)  ####

        //Load issues
        // Rx.Observable.from(sprints)
        //     .flatMap(sprint => {
        //         return issueDbController.uploadSprint(sprint.path, sprint.id, sprint.name)
        //     })
        //     .subscribe(function (results) {
        //         console.log("results: ", results)
        //     }, function (e) {
        //         console.log("error: ", e)
        //     });




        // //Load sprints

        // sprintDbController.uploadList("../../../sprint_list.json")
        //     .subscribe(function (results) {
        //         console.log("results: ", results)
        //     }, function (e) {
        //         console.log("error: ", e)
        //     });


        // // Load projects
        // projectDbController.uploadList("../../../projects.json")
        //     .subscribe(function (results) {
        //         console.log("results: ", results)
        //     }, function (e) {
        //         console.log("error: ", e)
        //     });


        //#####  Load after(2)  ####
        //Load users
        // userDbController.createListFrom("issue")
        //     .subscribe(function (results) {
        //         console.log("results: ", results)
        //     }, function (e) {
        //         console.log("error: ", e)
        //     });


    }
]);