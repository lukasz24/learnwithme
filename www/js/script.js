/*
function goToSite(id){
  
  //window.location.href+='#' + id;
  var anch = document.createElement('a');

  anch.setAttribute("href", "#"+id);
  anch.click();
}

var googleSignin = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
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

var googleSignout = function() {
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}
(function() {
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2E9hI9X2e2KCHyEiaz5vcaFXOFvY0HQc",
    authDomain: "learnwithme-98129.firebaseapp.com",
    databaseURL: "https://learnwithme-98129.firebaseio.com",
    projectId: "learnwithme-98129",
    storageBucket: "learnwithme-98129.appspot.com",
    messagingSenderId: "1032899670271"
  };
  firebase.initializeApp(config);

  

}());
*/

$(document).ready(function(){
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('haslo');
  const btnLogIn = document.getElementById('zaloguj');
  const btnGLogIn = document.getElementById("zalogujG");
  const btnFBLogIn = document.getElementById("zalogujFB");

  btnLogIn.addEventListener('click', function() {
  	//Pobranie email i hasła
  	const email = emailInput.value;
  	const passwd = passInput.value;
  	const auth = firebase.auth();
  	//Logowanie
  	const promise = auth.signInWithEmailAndPassword(email, passwd);
  	promise.catch(e => {console.log(e.message);
  		var info = document.getElementById('info');
  		info.innerText = "Niepoprawny email lub hasło!";
  		info.style.color = "red";
  		emailInput.style.backgroundColor = "#ff7777";
  		passInput.style.backgroundColor = "#ff7777";
  		
  	});
  });
});
/*
var someDiv = document.getElementById('someDiv');
  var dbRef = firebase.database().ref().child('text');
  dbRef.on('value', snap => someDiv.innerText = snap.val());
*/