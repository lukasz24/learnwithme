function init() {
  document.addEventListener("deviceready",onDeviceReady, false);

  
}

function onDeviceReady() {
  navigator.notification.beep(2);
  
   //EVENT LISTENER ZMIANY STATUSU ZALOGOWANIA
   /*
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      document.getElementById('info').innerHTML = "Ktoś jest zalogowany: " + firebaseUser.displayName;
      $('#info').text("Ktoś jest zalogowany: " + firebaseUser.displayName);
    }else{
      console.log("User not logged in");
      $('#info').text("Nikt się nie zalogował");
      document.getElementById('info').innerHTML = "Nikt się nie zalogował";
    }
  });

  /*
  logout.addEventListener('click', function(){
    firebase.auth().signOut();
  });
  */

}
$(document).ready(function(){
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      document.getElementById('info').innerHTML = "Ktoś jest zalogowany: " + firebaseUser.displayName;
      $('#info').text("Ktoś jest zalogowany: " + firebaseUser.displayName);
    }else{
      console.log("User not logged in");
      $('#info').text("Nikt się nie zalogował");
      document.getElementById('info').innerHTML = "Nikt się nie zalogował";
    }
  });
});

function check(){
  document.getElementById('info').innerHTML = "Sprawdzam czy ktoś się zalogował";
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      document.getElementById('info').innerHTML = "Ktoś jest zalogowany: " + firebaseUser.displayName;
      $('#info').text("QKtoś jest zalogowany: " + firebaseUser.displayName);
    }else{
      console.log("User not logged in");
      $('#info').text("QNikt się nie zalogował");
      document.getElementById('info').innerHTML = "Nikt się nie zalogował";
    }
  });
}

var googleSignin = function() {
  var info = document.getElementById('info');
  var provider = new firebase.auth.GoogleAuthProvider();
  info.innerHTML = "Próba logowania do Google...";

  firebase.auth().signInWithRedirect(provider).then(function() {
  return firebase.auth().getRedirectResult();
}).then(function(result) {
  // This gives you a Google Access Token.
  // You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});
/*
  firebase.auth().signInWithRedirect(provider).then(function() {
    console.log("TESTED");
  return firebase.auth().getRedirectResult();
}).then(function(result) {
  // This gives you a Google Access Token.
  // You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  console.log("User not logged in" + user);
  //info.innerHTML = "Zalogowano: " + user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  //info.innerHTML = "Kod błędu w catch: " + errorCode;
}).then(function(){
  goToSite("nextPage");
});

/*

  var provider = new firebase.auth.GoogleAuthProvider();
  console.log("Etap1: włączenie funkcji");
  // Using a redirect.
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
  }
  var user = result.user;
});

// Start a sign in process for an unauthenticated user.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithRedirect(provider);
  
  console.log(firebaseUser);
  //firebase.auth().currentUser.linkWithRedirect();

   /*
   if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      */
   /*
   firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
*/
}

var signout = function() {
   firebase.auth().signOut()
    
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}

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
        var email = error.email;
        var credential = error.credential;
    });
}