var fbLogin = function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithRedirect(provider).then(function() {
        return firebase.auth().getRedirectResult();
    }).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}