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
            //Create selected items array
            $scope.onSelectedItem = function (item) {
                isContain = $scope.selectedItems.contain(item);
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