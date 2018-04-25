function init() {
  document.addEventListener("deviceready",onDeviceReady, false);

  
}

function onDeviceReady() {
  navigator.notification.beep(2);
  (function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_wuzZSXY0t0H9qXeAt3EZ0-EXOiHzJyg",
    authDomain: "learnwitmev2.firebaseapp.com",
    databaseURL: "https://learnwitmev2.firebaseio.com",
    projectId: "learnwitmev2",
    storageBucket: "",
    messagingSenderId: "938090158185"
  };
  firebase.initializeApp(config);
}());

   //EVENT LISTENER ZMIANY STATUSU ZALOGOWANIA
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


var googleSignin = function() {
  var info = document.getElementById('info');
  var provider = new firebase.auth.GoogleAuthProvider();
  

  firebase.auth().signInWithRedirect(provider).then(function() {
  return firebase.auth().getRedirectResult();
}).then(function(result) {
  // This gives you a Google Access Token.
  // You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  info.innerHTML = "Zalogowano: " + user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  info.innerHTML = "Kod błędu w catch: " + error.code;
});


/*
  var provider = new firebase.auth.GoogleAuthProvider();
  console.log("Etap1: włączenie funkcji");
  var pres = firebase.auth().signInWithRedirect(provider);
  pres.catch(function(error){
    var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error.message);
  console.log(error.code);
  $('#info').text("Kod błędu: " + error.code);
  info.innerHTML = "Kod błędu: " + error.code;
  });
  pres.then(function() {
    console.log("Etap2: próba logowania");
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
  console.log(error.message);
  console.log(error.code);
});
  //firebase.auth().currentUser.linkWithRedirect();
*/
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

var googleSignout = function() {
   firebase.auth().signOut()
    
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}