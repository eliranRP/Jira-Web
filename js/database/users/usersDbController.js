MainApp.factory('userDbController', ['$rootScope',
    function ($rootScop) {
        var USERS = "users"
        var db = firebase.firestore();
        var collectionRef = db.collection(USERS);
        Object.byString = function (o, s) {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            var a = s.split('.');
            for (var i = 0, n = a.length; i < n; ++i) {
                var k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
            return o;
        }
        var serviceObject = {
            docRef: function (ref) {
                return collectionRef.doc(ref);
            },
            add: function (item) {
                return serviceObject.docRef(item.id).set(item)
            },
            getList: function () {
                return Rx.Observable.fromPromise(collectionRef.orderBy("displayName").get())
                    .flatMap(users => Rx.Observable.from(users.docs)
                        .map(doc => doc.data())
                        .filter(user => user.displayName != '' && user.displayName != null)
                        .map(doc => {
                            doc.isSelected = false
                            return doc;
                        }).toArray())
            },
            
            //Create a list of users from a collection
            //And return an observable
            //For instance, if we want to distinct all users from issue firestore collection
            // it should look like that ==>  createListFrom("issue")
            createListFrom: function (collectionName) {
                return Rx.Observable.fromPromise(db.collection(collectionName).get())
                    .flatMap(querySnapshot => {
                        return Rx.Observable.from(querySnapshot.docs)
                    })
                    .map(issue => {
                        return issue.data().fields.assignee
                    })
                    .filter(item => item != null && item.key != null && item.key != undefined)
                    .map(item => {
                        item.id = item.key
                        return item;
                    })
                    .distinct(issue => issue.key)
                    .flatMap(function (user) {
                        return Rx.Observable.fromPromise(serviceObject.add(user))
                    });
            }
        }






        return serviceObject;

    }]);