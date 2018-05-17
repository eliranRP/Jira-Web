MainApp.controller('AppCtrl', function ($scope, $http, rx) {

    function searchWikipedia(term) {
        return rx.Observable
            .fromPromise($http({
                url: "https://moveogroup.atlassian.net/rest/agile/1.0/board/202/project/os_authType=basic",
                method: "GET"
            }))
            .map(function (response) { return response.data[1]; });
    }

    $scope.search = '';
    $scope.results = [];

    /*
      Creates a "click" function which is an observable sequence instead of just a function.
    */
    $scope.$createObservableFunction('click')
        .map(function () { return $scope.search; })
        .flatMapLatest(searchWikipedia)
        .subscribe(function (results) {
            $scope.results = results;
        });
}); 

