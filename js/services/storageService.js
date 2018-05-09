MainApp.factory('storageService', ['$rootScope', '$firebaseArray', '$timeout', '$firebaseObject', '$firebaseStorage',
    function ($rootScope, $firebaseArray, $timeout, $firebaseObject, $firebaseStorage) {
        var ref = firebase.database().ref();
        var storage = firebase.storage().ref();
        var myObject;

        myObject = {
            imageExtIsValid: function (element) {
                var file = element.files[0];
                var type = file.type.split("/")[0];
                if (type != 'image')
                    return false;
                return true;
            },
            imageUpload: function (element, storageRef, fileName) {
                var file = element.files[0];
                // Get file extension
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(file.name)[0];

                // Create storage ref
                storageRef = storageRef.child(fileName + ext);//'logo'

                var storage = $firebaseStorage(storageRef);

                var task = storage.$put(file); // Upload file

                return new Promise((resolve, reject) => {

                    // For progress bar reason
                    task.$progress(function (snapshot) {
                        $rootScope.progress = true;
                    });
                    task.$complete(function (url) {
                        $rootScope.progress = false;
                        resolve(url.downloadURL);
                    }); //$complete
                    task.$error(function (error) {
                        reject(error);
                        console.error(error);
                    });
                });

            },
            fileUpload: function (element, storageRef, fileName) {
                var file = element.files[0];
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(file.name)[0];

                storageRef = storageRef.child(fileName + ext); //'instructions'
                var storage = $firebaseStorage(storageRef);
                var task = storage.$put(file); // Upload file

                return new Promise((resolve, reject) => {

                    // For progress bar reason
                    task.$progress(function (snapshot) {
                        $rootScope.progress = true;
                    });

                    task.$complete(function (url) {
                        $rootScope.progress = false;
                        resolve(url.downloadURL);
                    })

                    task.$error(function (error) {
                        console.error(error);
                        reject(error);
                    });
                })
            },

        }; //myObject

        return myObject;
    }]); //factory


