var config = {
    apiKey: "AIzaSyC2E9hI9X2e2KCHyEiaz5vcaFXOFvY0HQc",
    authDomain: "learnwithme-98129.firebaseapp.com",
    databaseURL: "https://learnwithme-98129.firebaseio.com",
    projectId: "learnwithme-98129",
    storageBucket: "learnwithme-98129.appspot.com",
    messagingSenderId: "1032899670271"
  };
  firebase.initializeApp(config);



var provider = new firebase.auth.GoogleAuthProvider();


function googleSignin() {
   firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ..
  console.log(user);
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
}

function googleSignout() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}