MainApp.controller('fuController', ['$scope', '$rootScope', 'Authentication','systemService',
    function ($scope, $rootScope, Authentication, systemService) {
        var ref = firebase.database().ref();


        $scope.create = function () {
            for (var i = 300; i < 302; i++) {
                var obj = systemService.objects.group;
                obj.email = "proj" + i + "@p.com";
                obj.password = "123456";
                Authentication.register(obj);
            }
           

        }

    }

]); //addMemberController

