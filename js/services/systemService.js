MainApp.factory('systemService', ['$rootScope', '$firebaseArray', '$timeout', '$firebaseObject', '$location',
    function ($rootScope, $firebaseArray, $timeout, $firebaseObject, $location) {
        var ref = firebase.database().ref();
        var myObject;

        myObject = {
            tabs: {
                headers: {
                    admin: [
                        { desc: 'מנהל מערכת', class: 'col-xs-2' },
                        { desc: 'דוא"ל', class: 'col-xs-5' },
                        { desc: 'סיסמה', class: 'col-xs-5' },
                    ],
                    group: [
                        { desc: 'קבוצה', class: 'col-xs-2' },
                        { desc: 'סיסמה', class: 'col-xs-3' },
                        { desc: 'תגית', class: 'col-xs-3' },
                        { desc: 'פרסום פרויקט', class: 'col-xs-2' },
                    ],
                    advisor: [
                        { desc: 'שם מרצה', class: 'col-xs-2' },
                        { desc: 'דוא"ל', class: 'col-xs-5' },
                    ],
                    area: {
                        type: [{ desc: 'סוג', class: 'col-xs-5' }],
                        name: [{ desc: 'תחום', class: 'col-xs-5' }]

                    }

                },
            },
            create: {
                admin: function () {
                    return obj = {
                        modalToggle: '#newAdminModal',
                        editModal: this.editModal,
                        type: 'admin',
                        email: this.email,
                        name: this.name,
                        password: this.password,
                        imagUrl: '',
                        id: this.id,
                        role: this.role,
                        date: firebase.database.ServerValue.TIMESTAMP,
                    }
                },
                group: function () {
                    return obj = {
                        modalToggle: '#newGroupModal',
                        editModal: this.editModal,
                        role: this.role,
                        type: 'group',
                        email: this.email,
                        password: this.password,
                        tag:this.tag,
                        imagUrl: '',
                        published: this.published,
                        id: this.id,
                        date: firebase.database.ServerValue.TIMESTAMP,
                    }
                },
                advisor: function () {
                    return obj = {
                        modalToggle: '#newAdvisorModal',
                        editModal: this.editModal,
                        type: 'advisor',
                        email: this.email,
                        name: this.name,
                        imagUrl: '',
                        id: this.id,
                        date: firebase.database.ServerValue.TIMESTAMP,
                    }
                },
                type: function () {
                    return obj = {
                        modalToggle: '#newTypeModal',
                        editModal: this.editModal,
                        type: 'areaType',
                        desc: this.desc,
                        id: this.id,
                        date: firebase.database.ServerValue.TIMESTAMP,
                    }
                },
                name: function () {
                    return obj = {
                        modalToggle: '#newNameModal',
                        editModal: this.editModal,
                        type: 'areaName',
                        val: this.val,
                        id: this.id,
                        date: firebase.database.ServerValue.TIMESTAMP,
                    }

                }
            },
            objects: {
                admin: {
                    modalToggle: '#newAdminModal',
                    editModal: '#editAdminModal',
                    type: 'admin',
                    email: '',
                    name: '',
                    role: 'admin',
                    password: '',
                    imagUrl: '',
                    id: '',
                    date: firebase.database.ServerValue.TIMESTAMP,
                },
                group: {
                    modalToggle: '#newGroupModal',
                    editModal: '#editGroupModal',
                    type: 'group',
                    role: 'group',
                    email: '',
                    password: '',
                    imagUrl: '',
                    tag:'',
                    published: false,
                    id: '',
                    date: firebase.database.ServerValue.TIMESTAMP,
                },
                advisor: {
                    modalToggle: '#newAdvisorModal',
                    editModal: '#editAdvisorModal',
                    type: 'advisor',
                    email: '',
                    name: '',
                    imagUrl: '',
                    id: '',
                    date: firebase.database.ServerValue.TIMESTAMP,
                },
                type: {
                    modalToggle: '#newTypeModal',
                    editModal: '#editTypeModal',
                    type: 'areaType',
                    desc: '',
                    id: '',
                    date: firebase.database.ServerValue.TIMESTAMP,
                },
                name: {
                    modalToggle: '#newNameModal',
                    editModal: '#editNameModal',
                    type: 'areaName',
                    val: '',
                    id: '',
                    date: firebase.database.ServerValue.TIMESTAMP,
                },
            },
            add: function (obj) {
                if (obj) {
                    var key = ref.child(obj.type).push().key;
                    obj.id = key;
                    var update = {};
                    update['/' + obj.type + '/' + obj.id] = obj;

                    return firebase.database().ref().update(update).then(function () {
                    }).catch(function (error) {
                        console.log(error)
                    }); //update
                }
            },
            remove: function (obj) {
                var remove = {};
                remove['/' + obj.type + '/' + obj.$id] = null;

                return firebase.database().ref().update(remove).then(function () {
                }).catch(function (error) {
                    console.log(error)
                }); //update
            },
            edit: function (obj) {
                if (obj) {
                    var update = {};
                    update['/' + obj.type + '/' + obj.id] = obj;

                    return firebase.database().ref().update(update).then(function () {
                    }).catch(function (error) {
                        console.log(error)
                    }); //update
                }
            }
        } //myObject
        return myObject;
    }]); //factory

