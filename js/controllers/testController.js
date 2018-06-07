MainApp.controller('testCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {
        var projectId = '10128';
        var group = [{ id: "eliran" }, { id: "tavor cohen" }]


        issueDbController.graphData.getProjectAnalysis(projectId, null, null)
            .subscribe(function (results) {
                console.log("All: ", results)

            }, function (e) {
                console.log("error: ", e)
            });

        issueDbController.graphData.getProjectAnalysis(projectId, [{ id: "tavor cohen" }], null)
            .subscribe(function (results) {
                console.log("tavor: ", results)

            }, function (e) {
                console.log("error: ", e)
            });




        issueDbController.graphData.getProjectAnalysis(projectId, [{ id: "eliran" }], null)
            .subscribe(function (results) {
                console.log("eliran: ", results)

            }, function (e) {
                console.log("error: ", e)
            });



        issueDbController.graphData.getProjectAnalysis(projectId, [{ id: "tamara" }], null)
            .subscribe(function (results) {
                console.log("tamara: ", results)

            }, function (e) {
                console.log("error: ", e)
            });














        //Rx.Observable.of(
        //    { id: 1, point: 100 },
        //    { id: 112, point: 122 },
        //    { id: 112, point: 133 },
        //    { id: 1, point: 12 },
        //    { id: 1, point: 12 },
        //    //{ id: 112, name: 'sfqfb2', point: 1 },
        //    //{ id: 3, name: 'qfs1', point: 1 },
        //    //{ id: 112, name: 'qsgqsfg2    ', point: 1 }
        //)
        //    .groupBy(p => p.id, p => Object.byString(p, "point"))
        //    .flatMap((group$) => group$
        //        .reduce((acc, cur) =>
        //            [...acc, cur], ["" + group$.key]
        //        ))
        //    .map(arr => ({ 'id': parseInt(arr[0]), 'values': arr.slice(1), 'sum': arr.slice(1).sum() }))
        //    .subscribe(p => console.log(p));

        //function median(values) {
        //    values.sort(function (a, b) {
        //        return a - b;
        //    });
        //    var half = Math.floor(values.length / 2);

        //    if (values.length % 2)
        //        return values[half];
        //    else
        //        return (values[half - 1] + values[half]) / 2.0;
        //}

        //console.log(median([24, 12, 26, 1, 16, 25]));

        //Rx.Observable.of({ id: 1, name: 'aze1', point: 1 },
        //    { id: 2, name: 'sf2', point: 1 },
        //    { id: 2, name: 'dg2', point: 1 },
        //    { id: 1, name: 'erg1', point: 1 },
        //    { id: 1, name: 'df1', point: 1 },
        //    { id: 2, name: 'sfqfb2', point: 1 },
        //    { id: 3, name: 'qfs1', point: 1 },
        //    { id: 2, name: 'qsgqsfg2', point: 1 }
        //)
        //    .groupBy(p => p.id)
        //    .flatMap((group$) => {
        //        return group$.reduce((data, issue, t, t2) => {
        //            return {
        //                count: data.count += 1,
        //                sum: data.sum += issue.point,
        //            }
        //        }, { count: 0, sum: 0 })
        //    })
        //    .map(arr => {
        //        console.log("data: ", arr)
        //        return arr;
        //    })
        //    .subscribe(p => console.log(p));

    }]);
