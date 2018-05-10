function init() {
  document.addEventListener("deviceready",onDeviceReady, false);
}

function onDeviceReady() {
  navigator.notification.beep(2);
}
$(document).ready(function(){
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      document.getElementById('info').innerHTML = "Ktoś jest zalogowany: " + firebaseUser.displayName;
      $('#info').text("Ktoś jest zalogowany: " + firebaseUser.email);
    }else{
      console.log("User not logged in");
      $('#info').text("Nikt się nie zalogował");
      document.getElementById('info').innerHTML = "Nikt się nie zalogował";
    }
  });
});

var googleSignin = function() {
    var info = document.getElementById('info');
    var provider = new firebase.auth.GoogleAuthProvider();
    info.innerHTML = "Próba logowania do Google...";

    firebase.auth().signInWithRedirect(provider).then(function() {
        return firebase.auth().getRedirectResult();
    }).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
};

var signout = function() {
   firebase.auth().signOut()
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
};

var fbLogin = function() {
    info.innerHTML = "Próba logowania do FB...";
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
    });
};