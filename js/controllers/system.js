MainApp.controller('systemController', ['$scope', '$rootScope', '$firebaseAuth',
    '$firebaseArray', '$firebaseObject', 'systemService', 'Authentication', '$timeout',
    function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject,
        systemService, Authentication, $timeout) {
        var ref = firebase.database().ref();
        var auth = $firebaseAuth();



        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                $rootScope.currentAdmin.$loaded().then(function (data) {
                    var currentAdmin = $rootScope.currentAdmin;
                    if (currentAdmin.role == 'admin') {

                        $scope.tableHeders = systemService.tabs.headers;


                        $scope.admin = systemService.objects.admin;
                        $scope.Cgroup = systemService.objects.group;
                        $scope.advisor = systemService.objects.advisor;
                        $scope.type = systemService.objects.type;
                        $scope.name= systemService.objects.name;




                        var adminRef = ref.child(systemService.objects.admin.type);
                        $scope.adminArr = $firebaseArray(adminRef);

                        var groupRef = ref.child(systemService.objects.group.type);
                        $scope.groupArr = $firebaseArray(groupRef);

                        var advisorRef = ref.child(systemService.objects.advisor.type);
                        $scope.advisorArr = $firebaseArray(advisorRef);

                        var areaTypeRef = ref.child(systemService.objects.type.type);
                        $scope.areaTypeArr = $firebaseArray(areaTypeRef);

                        var areaNameRef = ref.child(systemService.objects.name.type);
                        $scope.areaNameArr = $firebaseArray(areaNameRef);


                        $scope.add = function (obj) {
                            if (obj.type == 'admin' || obj.type == 'group') {
                                Authentication.createUser(obj);
                            }
                            else {
                                systemService.add(obj);
                            }

                            $(obj.modalToggle).modal('toggle');
                            $("form").trigger("reset");
                        }
                        $scope.update = function (obj) {
                            systemService.edit(obj);
                            $(obj.editModal).modal('toggle');
                        }

                        $scope.previewProject = function (item) {
                            localStorage.removeItem("preiview");
                            var obj = {}
                            obj = angular.toJson(item);
                            localStorage.setItem("preiview", obj);
                        }
                        //Getting object reference
                        // and then save changes
                        $scope.updateTag = function (item) {
                            $scope.groupState = null;
                            var groupSwitchBindRef = ref.child('group').child(item.id);
                            $scope.group = $firebaseObject(groupSwitchBindRef);

                            $scope.group.$loaded(function () {
                                $scope.group.tag = item.tag;
                                $scope.group.$save();
                                $(obj.editModal).modal('toggle');
                            });
                        }

                        $scope.groupStateChange = function (item) {


                            $scope.groupState = null;
                            var groupSwitchBindRef = ref.child('group').child(item.$id);
                            $scope.groupState = $firebaseObject(groupSwitchBindRef);

                            $scope.groupState.$loaded(function () {
                                $scope.groupState.published = !item.published;
                                $scope.groupState.$save();
                            });

                            
                        }
                        $scope.set = function (item) {
                            $scope.edit = null;
                            if (item.type == 'admin') {
                                $scope.edit = systemService.create.admin.bind(item)();
                            }
                            else if (item.type == 'group') {
                                $scope.edit = systemService.create.group.bind(item)();
                            }
                            else if (item.type == 'advisor') {
                                $scope.edit = systemService.create.advisor.bind(item)();
                            }
                            else if (item.type == 'areaName') {
                                $scope.edit = systemService.create.name.bind(item)();

                            }
                            else {
                                $scope.edit = systemService.create.type.bind(item)();
                            }
                        }

                        $scope.remove = function (obj) {
                            systemService.remove(obj);
                        }

                    }
                    else {
                        $rootScope.currentAdmin = null;
                        $rootScope.message = 'אין לך הרשאות לדף זה';
                    }
                })
            }
        });
    }]); //addMemberController

