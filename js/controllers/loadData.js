MainApp.controller('LoadData', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController','graphService',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService) {




        issueDbController.uploadSprint("../../../sprint_12_399.json", "399")
           .subscribe(function (results) {
               console.log("results: ", results)
           }, function (e) {
               console.log("error: ", e)
           });

    }]);
