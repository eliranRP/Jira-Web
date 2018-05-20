MainApp.factory('issueDbController', ['$rootScope', 'utils',
    function ($rootScop, utils) {
        var ISSUE = "issue"
        var db = firebase.firestore();
        var collectionRef = db.collection(ISSUE);
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
                return collectionRef.doc(item.id + "_" + item.sprintId).set(item)
            },
            uploadSprint: function (path, sprintId) {
                return Rx.Observable
                    //.fromPromise(utils.uploadFile(file, fileName))
                    .fromPromise(utils.loadJson(path))
                    .map(items => {
                        items.issues.forEach(issue => issue.sprintId = sprintId)
                        return items.issues
                    })
                    .flatMap(items => Rx.Observable.from(items))
                    .map(item => serviceObject.add(item))
                    .flatMap(prmise => Rx.Observable.fromPromise(prmise))

            },
            //Return all issues by users id's
            getListByGroup: function (group, sprintId) {

                var promises = [];

                //Create a query
                group.forEach((user) => {
                    promises.push(db.collection("issue")
                        .where(issuesConstant.PRIMARY_KEY, "==", user.id)
                        .where(issuesConstant.SPRINT_ID, "==", sprintId)
                        .get())
                })

                //return observable with all filterd issues
                return Rx.Observable.fromPromise(Promise.all(promises))
                    .flatMap(querySnapshot => Rx.Observable.from(querySnapshot))
                    //.map(issue => {
                    //    console.log('issues: ', issue)
                    //    return issue
                    //})
                    .map(issue => issue.docs)
                    .flatMap(issues => Rx.Observable.from(issues))
                    .map(issue => issue.data())

            },
            agrregation: {
                sum: function (keySelector, observableData) {
                    return observableData
                        .filter(issue => Object.byString(issue, keySelector) != undefined)
                        .reduce((data, issue) => {
                            return {
                                totalIssues: data.totalIssues += 1,
                                donePoints: serviceObject.doneIssues(data, issue, keySelector),
                                sumAllPoints: data.sumAllPoints += Object.byString(issue, keySelector),
                                sprint: issue.sprintId
                            }
                        }, { totalIssues: 0, donePoints: 0, sumAllPoints: 0, sprint: '' })
                },
                average: function (keySelector, observableData) {
                    return observableData
                        .filter(issue => Object.byString(issue, keySelector) != undefined)
                        .reduce((data, issue) => {
                            return {
                                count: data.count += 1,
                                sum: data.sum += Object.byString(issue, keySelector)
                            }
                        }, { count: 0, sum: 0 })
                }
            },
            doneIssues: function (data, issue,keySelector) {
                if (issue.fields.status.name == "Done") {
                    return data.donePoints += Object.byString(issue, keySelector)
                }
                return data.donePoints;
            },
            getSumOfGroup: function (group, sprintId, observableData) {

                var keySelector = issuesConstant.POINTS_KEY_SELECTOR;
                if (observableData == null || observableData == undefined)
                    observableData = serviceObject.getListByGroup(group, sprintId)

                return serviceObject.agrregation.sum(keySelector, observableData)
            },
            getAllDoneIssue: function (group, sprintId) {
                var observableData = serviceObject.getListByGroup(group, sprintId)
                    .filter(issue => issue.fields.status.name == "Done")

                return serviceObject.getSumOfGroup(null, null, observableData)
            },
            loadSprintJson: function (path) {
                return utils.loadJson(path)
            }
        }

        return serviceObject;

    }]);