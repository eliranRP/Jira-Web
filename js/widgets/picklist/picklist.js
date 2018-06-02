MainApp.directive('jwbpicklist', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '=',
            items: '=info',
            'select': '&onSelect'
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

            //Create selected items array
            $scope.onSelectedItem = function (item) {
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

            this.getSelected = function () {
                return $scope.selectedItems;
            }
        }],
        templateUrl: '/js/widgets/picklist/picklist.html'
    };
});