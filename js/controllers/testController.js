MainApp.controller('testCtrl', ['$scope', 'rx', 'observeOnScope', 'utils', 'sprintDbController', 'issueDbController',
    'userDbController', 'graphService', 'projectDbController',
    function ($scope, rx, observeOnScope, utils, sprintDbController, issueDbController,
        userDbController, graphService, projectDbController) {
        Array.prototype.sum = function () {
            sum = 0;
            for (i = 0; i < this.length; i++) {
                sum += Number(this[i]);
            }
            return sum;
        }
        Rx.Observable.of(
            { id: 1, point: 100 },
            { id: 112, point: 122 },
            { id: 112, point: 133 },
            { id: 1, point: 12 },
            { id: 1, point: 12 },
            //{ id: 112, name: 'sfqfb2', point: 1 },
            //{ id: 3, name: 'qfs1', point: 1 },
            //{ id: 112, name: 'qsgqsfg2', point: 1 }
        )
            .groupBy(p => p.id, p => p.point)
            .flatMap((group$) => group$
                .reduce((acc, cur) =>
                    [...acc, cur], ["" + group$.key]
                ))
            .map(arr => ({ 'id': parseInt(arr[0]), 'values': arr.slice(1), 'sum': arr.slice(1).sum() }))
            .subscribe(p => console.log(p));

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
