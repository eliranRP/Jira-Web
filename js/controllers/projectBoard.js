MainApp.controller('projectController', ['$scope', '$rootScope',
    '$firebaseArray', '$firebaseObject', '$location', 'systemService', 'groupService', '$sce',
    function ($scope, $rootScope, $firebaseArray, $firebaseObject, $location, systemService, groupService, $sce) {
        var ref = firebase.database().ref();

        var groupRef = ref.child(systemService.objects.group.type);
        $scope.groupArr = $firebaseArray(groupRef);

        $scope.year = groupService.objects.year;

        var areaTypeRef = ref.child(systemService.objects.type.type);
        $scope.areaTypeArr = $firebaseArray(areaTypeRef);

        var areaNameRef = ref.child(systemService.objects.name.type);
        $scope.areaNameArr = $firebaseArray(areaNameRef);


        $scope.set=function(proj){
            localStorage.removeItem("preiview");
            obj = angular.toJson(proj);
            localStorage.setItem("preiview", obj);
        }
    }]); //addMemberController

