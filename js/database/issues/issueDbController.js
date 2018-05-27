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
            groupQuery: {
                bySprint: function (group, currentSprintId) {

                    var promises = [];

                    //Create a query
                    group.forEach((user) => {
                        promises.push(db.collection("issue")
                            .where(issuesConstant.PRIMARY_KEY, "==", user.id)
                            .where(issuesConstant.SPRINT_ID, "==", currentSprintId)
                            .get())
                    })

                    return promises;
                },
                byProject: function (group, projectNames) {

                    var promises = [];

                    //Create a query
                    group.forEach((user) => {
                        promises.push(db.collection("issue")
                            .where(issuesConstant.PRIMARY_KEY, "==", user.id)
                            .where(issuesConstant.PROJECT_NAME, "==", projectName)
                            .get())
                    })

                    return promises;
                },
                byStatus: function (group, status) {

                    var promises = [];

                    //Create a query
                    group.forEach((user) => {
                        promises.push(db.collection("issue")
                            .where(issuesConstant.PRIMARY_KEY, "==", user.id)
                            .where(issuesConstant.STATUS_NAME, "==", status)
                            .get())
                    })

                    return promises;
                },
                byUser: function (group, projectNames) {

                    var promises = [];

                    //Create a query
                    group.forEach((user) => {
                        promises.push(db.collection("issue")
                            .where(issuesConstant.PRIMARY_KEY, "==", user.id)
                            .get())
                    })

                    return promises;
                }
            },
            //Return all issues by users id's
            getListByUsers: function (promises) {
                //return observable with all filterd issues
                return Rx.Observable.fromPromise(Promise.all(promises))
                    .flatMap(querySnapshot => Rx.Observable.from(querySnapshot))
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
                        //Calculate the average
                        .map(data => {
                            return {
                                sum: data.sum,
                                count: Object.keys(data.sprints).length,
                                average: data.sum / Object.keys(data.sprints).length
                            }
                        })
                },
                groupBy: function (keySelector, observableData) {
                    return observableData
                        .filter(issue => Object.byString(issue, keySelector) != undefined)
                        .reduce((data, issue) => {
                            return {
                                count: data.count += 1,
                                sum: data.sum += Object.byString(issue, keySelector),
                                sprints: function () {
                                    if (data.sprints["'" + issue.sprintId + "'"] == undefined) {
                                        data.sprints["'" + issue.sprintId + "'"] = {};
                                        data.sprints["'" + issue.sprintId + "'"].points = 0;
                                    }
                                    data.sprints["'" + issue.sprintId + "'"].points += Object.byString(issue, keySelector)
                                    data.sprints["'" + issue.sprintId + "'"].name = "name" + issue.sprintId;//Add the sprint name in issue object
                                    return data.sprints
                                }()
                            }
                        }, { count: 0, sum: 0, sprints: [] })
                        //Calculate the average
                        .map(data => {
                            return {
                                sum: data.sum,
                                count: Object.keys(data.sprints).length,
                                average: data.sum / Object.keys(data.sprints).length,
                                sprints: function () {
                                    var graphData = []
                                    for (var key in data.sprints) {
                                        graphData.push(data.sprints[key]);
                                    }
                                    return graphData;
                                }()
                            }
                        })
            },
            doneIssues: function (data, issue, keySelector) {
                if (issue.fields.status.name == "Done") {
                    return data.donePoints += Object.byString(issue, keySelector)
                }
                return data.donePoints;
            },
            getSumOfGroup: function (group, currentSprintId, observableData) {

                var keySelector = issuesConstant.POINTS_KEY_SELECTOR;
                if (observableData == null || observableData == undefined) {
                    var promises = serviceObject.groupQuery.bySprint(group, currentSprintId);
                    observableData = serviceObject.getListByUsers(promises)

                }

                return serviceObject.agrregation.sum(keySelector, observableData)
            },
            getRecomndedPoints: function (group, observableData) {

                var keySelector = issuesConstant.POINTS_KEY_SELECTOR;
                if (observableData == null || observableData == undefined) {
                    var promises = serviceObject.groupQuery.byStatus(group, issuesConstant.STATUS.DONE);
                    observableData = serviceObject.getListByUsers(promises)
                }

                return serviceObject.agrregation.average(keySelector, observableData)
            },
            loadSprintJson: function (path) {
                return utils.loadJson(path)
            }
        }

        return serviceObject;

    }]);