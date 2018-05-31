MainApp.controller('LoadData', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController','graphService',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService) {


        //Load issues

        //issueDbController.uploadSprint("../../../sprint_18_425.json", "425","Sprint 18")
        //   .subscribe(function (results) {
        //       console.log("results: ", results)
        //   }, function (e) {
        //       console.log("error: ", e)
        //   });



        //Load sprints

        //sprintDbController.uploadList("../../../sprint_list.json")
        //   .subscribe(function (results) {
        //       console.log("results: ", results)
        //   }, function (e) {
        //       console.log("error: ", e)
        //   });

    }]);
