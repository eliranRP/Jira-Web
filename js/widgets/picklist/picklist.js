MainApp.directive('jwbpicklist', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '=',
            items: '=info',
        },
        controller: ['$scope', function picklistCtrl($scope) {

            $scope.selectedItems = [];
            function contain(array, item) {

                var found = false;
                var position = -1;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == item.id) {
                        found = true;
                        position = i;
                        break;
                    }
                }
                return { isFound: found, position: position }
            }

            //Create selected users array
            function selectedItems(item) {
                isContain = contain($scope.selectedItems, item)
                if (item.isSelected) {
                    if (!isContain.isFound)
                        $scope.selectedItems.push(item);
                } else {

                    for (var i = 0; i < $scope.selectedItems.length; i++) {
                        if ($scope.selectedItems[i].id == item.id) {
                            $scope.selectedItems.splice(i, 1);
                        }
                    }
                }
            }
        }],
        templateUrl: '/js/widgets/picklist/picklist.html'
    };
})
    .directive('jwblistAsChips', function () {
        return {
            require: '^^jwbpicklist',
            restrict: 'E',
            transclude: true,
            scope: {
            },
            templateUrl: '/js/widgets/picklist/listAsChips.html'
        };
    });;
