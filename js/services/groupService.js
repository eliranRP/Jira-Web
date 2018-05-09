MainApp.factory('groupService', ['$rootScope', '$firebaseArray', '$timeout', '$firebaseObject', '$location',
    function ($rootScope, $firebaseArray, $timeout, $firebaseObject, $location) {
        var ref = firebase.database().ref();
        var myObject;
        myObject = {
            tabs: {
                headers: {
                    proj: {
                        name: 'פרטי פרויקט',
                        num: '1',
                        href: 'tab1',
                        ariaExpanded: 'true',
                        class: 'active'
                    },
                    poster: {
                        name: 'פוסטר',
                        num: '2',
                        href: 'tab2',
                        ariaExpanded: 'false',
                        class: 'active'
                    },
                    general: {
                        name: 'כללי',
                        num: '3',
                        href: 'tab3',
                        ariaExpanded: 'false',
                        class: 'active'
                    },
                    team: {
                        name: 'צוות',
                        num: '4',
                        href: 'tab4',
                        ariaExpanded: 'false',
                        class: 'active'
                    },
                }
            },
            objects: {
                user: {
                    ref: 'team',
                    parentRef: 'group',
                    modalToggle: '#newContactModal',
                    editModal: '#editContactModal',
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    id: '',
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bscbehevioralprod.appspot.com/o/defProfile.png?alt=media&token=6669a507-7e21-4f49-acc9-800980c09b3f'
                },
                year: ['תשע"ז', 'תשע"ח', 'תשע"ט', 'תש"פ'],
                detailes: {
                    ref: 'details',
                    parentRef: 'group',
                    poster: {
                        imageUrl: '',
                        fileUrl: '',
                        movieUrl:''
                    },
                    project: {
                        name: '',
                        desc: '',
                        textDesc:'',
                    },
                    general: {
                        advisor: '',
                        year: '',
                        department: 'מדעי ההתנהגות',
                        area: {
                            name: '',
                            desc: ''
                        }
                    }
                }
            },
            create: {
                user: function () {
                    return obj = {
                        ref: this.ref,
                        parentRef: this.parentRef,
                        modalToggle: this.modalToggle,
                        editModal: this.editModal,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phone: this.phone,
                        email: this.email,
                        id: this.id,
                        imageUrl: this.imageUrl,
                    }
                },
                advisor: function () {
                    return obj = {
                        type: 'advisor',
                        email: this.email,
                        name: this.name,
                        imagUrl: '',
                    }
                },
                area: function () {
                    return obj = {
                        type: 'area',
                        desc: this.desc.desc,
                        name: this.name.name,
                    }
                },
            },
            addUser: function (obj) {
                if (obj) {
                    var key = ref.child(obj.parentRef).child($rootScope.currentGroup.$id).child(obj.ref).push().key;
                    obj.id = key;
                    var update = {};
                    update['/' + obj.parentRef + '/' + $rootScope.currentGroup.$id + '/' + obj.ref + '/' + obj.id] = obj;

                    return firebase.database().ref().update(update).then(function () {
                    }).catch(function (error) {
                        console.log(error)
                    }); //update
                }
            },
            remove: function (key, arr) {
                if (arr) {
                    var item = arr[key];
                    return arr.$remove(item).then(function (ref) {
                    });
                }// if
            },
            edit: function (obj) {
                if (obj) {
                    var update = {};
                    update['/' + obj.parentRef + '/' + $rootScope.currentGroup.$id + '/' + obj.ref + '/' + obj.id] = obj;

                    return firebase.database().ref().update(update).then(function () {
                    }).catch(function (error) {
                        console.log(error)
                    }); //update
                }
            },
            saveChanges: function (obj) {
                if (obj) {
                    var update = {};
                    update['/' + obj.parentRef + '/' + $rootScope.currentGroup.$id + '/' + obj.ref] = obj;

                    return firebase.database().ref().update(update).then(function () {
                    }).catch(function (error) {
                        console.log(error)
                    }); //update
                }
            }
        }; //myObject

        return myObject;
    }]); //factory

