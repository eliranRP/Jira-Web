MainApp.factory('projectDbController', ['$rootScope', 'utils',
    function ($rootScop, utils) {
        var PROJECT = "project"
        var db = firebase.firestore();
        var collectionRef = db.collection(PROJECT);
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
                return serviceObject.docRef(item.id + "").set(item)
            },
            loadSprintData: function (path) {
                return utils.loadJson(path)
            },
            uploadList: function (path) {
                return utils.loadJsonFromPromise(path)
                    .flatMap(items => {
                        console.log("debugging -uploadSprintList", items)
                        return Rx.Observable.from(items.values)
                    })
                    .map(item => serviceObject.add(item))
                    .flatMap(prmise => Rx.Observable.fromPromise(prmise))
            },
            getList: function () {
                return Rx.Observable.fromPromise(collectionRef.orderBy("id" ,'desc').get())
                    .flatMap(sprints => Rx.Observable.from(sprints.docs)
                        .map(doc => {
                            return { name: doc.data().name, id: doc.data().id, avatar: Object.byString(doc.data(), projectsConstants.AVATAR) }
                        }).toArray())

            }
        }

        return serviceObject;

    }]);