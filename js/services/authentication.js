MainApp.factory('Authentication',
    ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth', '$firebaseArray',
        function ($rootScope, $location, $firebaseObject, $firebaseAuth, $firebaseArray) {

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();
            var myObject;

            auth.$onAuthStateChanged(function (authUser) {
                if (authUser) {
                    var groupRef = ref.child('group').child(authUser.uid);
                    var currentGroup = $firebaseObject(groupRef);
                    $rootScope.currentGroup = currentGroup;

                    var adminRef = ref.child('admin').child(authUser.uid);
                    var currentAdmin = $firebaseObject(adminRef);
                    $rootScope.currentAdmin = currentAdmin;
                } else {
                    $rootScope.currentGroup = null;
                    $rootScope.currentAdmin = null;
                }
            });


            myObject = {

                login: function (user) {
                    $rootScope.message = null;
                    auth.$signInWithEmailAndPassword(
                        user.email,
                        user.password
                    ).then(function (user) {
                        $rootScope.prevUser = null;
                    }).catch(function (error) {
                        $rootScope.message = error.message;

                    }); //signInWithEmailAndPassword

                }, //login
                resetPassword: function (resetEmail) {
                    $rootScope.message = null;
                    $rootScope.Modalmessage = null;
                    auth.$sendPasswordResetEmail(resetEmail).then(function () {
                        $rootScope.Modalmessage = '  הודעת איפוס נשלחה לכתובת  ' + resetEmail
                        // Email sent.
                    }).catch(function (error) {
                        if (error.code == 'auth/user-not-found')
                            $rootScope.Modalmessage = 'המשתמש לא זוהה במערכת, וודא שהכתובת נכונה'
                        else
                            $rootScope.Modalmessage = error;
                        console.log(error);
                        // An error happened.
                    });

                }, //resetPassword
                logout: function () {
                    $rootScope.message = null;
                    return auth.$signOut();
                }, //logout
                requireAuth: function () {
                    $rootScope.message = null;
                    $rootScope.Modalmessage = null;
                    return auth.$requireSignIn();
                }, //requireAuth
                register: function (obj) {
                    auth.$createUserWithEmailAndPassword(
                        obj.email,
                        obj.password
                    ).then(function (regObj) {
                        obj.id = regObj.uid;
                        var update = {};
                        update['/' + obj.type + '/' + regObj.uid] = obj;

                        return firebase.database().ref().update(update).then(function () {
                        }).catch(function (error) {
                            console.log(error)
                        }); //update
                    }).catch(function (error) {
                        console.log(error)
                    }); //createUserWithEmailAndPassword

                }, //register
                createUser: function (obj) {
                    $rootScope.prevUser = $rootScope.currentAdmin;
                    auth.$createUserWithEmailAndPassword(
                        obj.email,
                        obj.password
                    ).then(function (regObj) {
                        obj.id = regObj.uid;
                        var update = {};
                        update['/' + obj.type + '/' + regObj.uid] = obj;

                        return firebase.database().ref().update(update).then(function () {
                            myObject.logout();
                            myObject.login($rootScope.prevUser);
                        }).catch(function (error) {
                            console.log(error)
                        }); //update
                    }).catch(function (error) {
                        console.log(error)
                    }); //createUserWithEmailAndPassword

                }, //register
            }; //myObject

            return myObject;
        }]); //factory


