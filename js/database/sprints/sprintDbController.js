MainApp.factory('sprintDbController', ['$rootScope', 'utils',
    function ($rootScop, utils) {
        var SPRINT = "sprint"
        var db = firebase.firestore();
        var collectionRef = db.collection(SPRINT);
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
                    .filter(sprint => sprint.name.toLowerCase().indexOf('bravo') > -1)
                    .map(item => serviceObject.add(item))
                    .flatMap(prmise => Rx.Observable.fromPromise(prmise))
            },
            getList: function () {
                return Rx.Observable.fromPromise(collectionRef.orderBy("id" ,'desc').get())
                    .flatMap(sprints => Rx.Observable.from(sprints.docs)
                        .map(doc => {
                            return { name: doc.data().name, id: doc.data().id, state: doc.data().state }
                        }).toArray())

            }
        }

        return serviceObject;

    }]);