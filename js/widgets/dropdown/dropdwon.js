MainApp.directive('jwbdropdown', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            identifier: '=',
            items: '=info',
            'select': '&onSelect'
        },
        controller: ['$scope', function dropdownCtrl($scope) {

            $scope.close = function () {
                $("#" + $scope.identifier).removeClass("open");
            }
        }],
        templateUrl: '/js/widgets/dropdown/dropdwon.html'
    };
});
