MainApp.directive('jwbdropdown', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            value: '=',
            items: '=info',
            'select': '&onSelect'
        },
        templateUrl: '/js/widgets/dropdown/dropdwon.html'
    };
});
