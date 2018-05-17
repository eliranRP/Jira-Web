

var firebaseConfiguration = {
    jira: {
        prod: {

        },
        dev: {
            apiKey: "AIzaSyDU5VtPKo8Tc63EavtA2s9bwn_p1ZuFvbw",
            authDomain: "moveojira-98570.firebaseapp.com",
            databaseURL: "https://moveojira-98570.firebaseio.com",
            projectId: "moveojira-98570",
            storageBucket: "moveojira-98570.appspot.com",
            messagingSenderId: "737878980623"
        }
    }
}


firebase.initializeApp(firebaseConfiguration.jira.dev);