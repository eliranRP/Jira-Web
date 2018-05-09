MainApp.controller('groupController', ['$scope', '$rootScope', '$firebaseAuth',
    '$firebaseArray', '$firebaseObject', 'Authentication', 'groupService',
    'systemService', 'storageService', '$location',
    function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject,
        Authentication, groupService, systemService, storageService, $location,$sce) {
        var ref = firebase.database().ref();
        var auth = $firebaseAuth();
        var isDebug = true;
        var storage = firebase.storage().ref();
        $rootScope.progress = false;
        var isNewGroup;
        auth.$onAuthStateChanged(function (authUser) {
            if (authUser || isDebug) {
                $rootScope.currentAdmin.$loaded().then(function (data) {
                    var currentGroup = $rootScope.currentGroup;
                    if (currentGroup.role == 'group') {

                        var currentGroup = $rootScope.currentGroup;

                        $scope.user = groupService.objects.user;
                        $scope.year = groupService.objects.year;

                        var advisorRef = ref.child(systemService.objects.advisor.type);
                        $scope.advisorArr = $firebaseObject(advisorRef);

                        var areaTypeRef = ref.child(systemService.objects.type.type);
                        $scope.areaTypeArr = $firebaseArray(areaTypeRef);

                        var areaNameRef = ref.child(systemService.objects.name.type);
                        $scope.areaNameArr = $firebaseArray(areaNameRef);

                        var teamRef = ref.child('group').child(currentGroup.$id).child('team');
                        $scope.team = $firebaseArray(teamRef);


                        var groupRef = ref.child('group').child(currentGroup.$id);
                        $scope.group = $firebaseObject(groupRef);


                        $scope.group.$loaded().then(function (data) {
                            if ($scope.group.details == null) {
                                isNewGroup = true;
                                $scope.detailes = groupService.objects.detailes;
                            }
                            else {
                                isNewGroup = false;
                                var detailsRef = ref.child('group').child(currentGroup.$id).child('details');
                                $scope.detailes = $firebaseObject(detailsRef);

                                $scope.detailes.$loaded().then(function (data) {
                                    /*https://summernote.org/  */
                                    $('.note-editable').html($scope.detailes.project.desc);
                                    $('#add_product_desc, #edit_product_desc').summernote({
                                        toolbar: [
                                            ['style', ['bold', 'italic', 'underline', 'clear']],
                                            ['fontsize', ['fontsize']],
                                            ['color', ['color']],
                                            ['misc', ['undo', 'redo', 'fullscreen']],
                                            ['height', ['height']]
                                        ]
                                    });

                                })
                            }
                        })


                        $scope.redirect = function (url) {
                            $location.path(url);
                        }

                        $scope.addUser = function (obj) {
                            groupService.addUser(obj);
                            $(obj.modalToggle).modal('toggle');
                            $scope.user.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/bscbehevioralprod.appspot.com/o/defProfile.png?alt=media&token=6669a507-7e21-4f49-acc9-800980c09b3f';
                            $("form").trigger("reset");

                        }
                        $scope.remove = function (key) {
                            groupService.remove(key, $scope.team);
                        }
                        $scope.set = function (obj) {
                            $scope.edit = null;
                            $scope.edit = groupService.create.user.bind(obj)();
                        }
                        $scope.update = function (obj) {
                            groupService.edit(obj);
                            $(obj.editModal).modal('toggle');
                        }
                        $scope.saveChanges = function () {
                            $scope.detailes.project.desc = $('.note-editable').html();
                            $scope.detailes.project.textDesc = $('.note-editable').text();
                            if (isNewGroup) {
                                groupService.saveChanges($scope.detailes);
                            }
                            else {

                                $scope.detailes.$save().then(function (ref) {
                                    //ref.key() === obj.$id; // true
                                }, function (error) {
                                    console.log("Error:", error);
                                });
                            }

                        }

                        // change kita status open / close
                        var groupSwitchBindRef = ref.child('group').child(currentGroup.$id);
                        $scope.groupState = $firebaseObject(groupSwitchBindRef);

                        $scope.groupStateChange = function () {
                            $scope.groupState.published = !$scope.groupState.published;
                            $scope.groupState.$save();
                        }
                        $scope.previewProject = function () {
                            $scope.detailes.project.desc = $('.note-editable').html();
                            localStorage.removeItem("preiview");
                            $scope.group.details = $scope.detailes;
                            var obj = {}
                            obj = angular.toJson($scope.group);
                            localStorage.setItem("preiview", obj);
                        }


                        $scope.imageUpload = function (element) {
                            var isValid = storageService.imageExtIsValid(element);
                            if (isValid) {
                                var key = ref.child('group').child('members').child('img').child(currentGroup.$id).push().key;
                                var storeRef = storage.child('group').child('members').child('img').child(currentGroup.$id).child(key);
                                storageService.imageUpload(element, storeRef, 'memberImage').then(function (url) {
                                    $scope.$apply(function () {
                                        if ($scope.user)
                                            $scope.user.imageUrl = url;
                                        if ($scope.edit)
                                            $scope.edit.imageUrl = url;
                                    })
                                })
                            }
                            else {
                                $scope.$apply(function () {
                                    $scope.imageMsg = 'עליך להעלות קובץ מסוג תמונה';
                                });
                            }
                        }
                        $scope.posterImageUpload = function (element) {
                            var isValid = storageService.imageExtIsValid(element);
                            if (isValid) {
                                var storeRef = storage.child('group').child('poster').child('img').child(currentGroup.$id);
                                storageService.imageUpload(element, storeRef, 'memberImage').then(function (url) {
                                    $scope.$apply(function () {
                                        $scope.detailes.poster.imageUrl = url;
                                    })
                                })
                            }
                            else {
                                $scope.$apply(function () {
                                    $scope.imageMsg = 'עליך להעלות קובץ מסוג תמונה';
                                });
                            }
                        }
                        $scope.posterfileUpload = function (element) {
                            var storeRef = storage.child('group').child('poster').child('file').child(currentGroup.$id);
                            storageService.fileUpload(element, storeRef, 'posterFile').then(function (url) {
                                $scope.$apply(function () {
                                    $scope.detailes.poster.fileUrl = url;
                                });
                            });
                        }
                        var url = "../assets/js/app.bundle.js";
                        $.getScript(url, function () {
                        });


                    }//if
                    else {
                        $rootScope.currentGroup = null;
                        $rootScope.message = 'כניסה למשתמשים בלבד';
                    }
                });
            }
        });
    }]); //addMemberController

