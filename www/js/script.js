function goToSite(id){
  var anch = document.createElement('a');
  anch.setAttribute("href", "#"+id);
  anch.click();
}

(function() {
    // Initialize Firebase
    var config = {
        //apiKey: "AIzaSyC2E9hI9X2e2KCHyEiaz5vcaFXOFvY0HQc",    //browser key
        apiKey: "AIzaSyBpHX7UlYiPCqkTRxFOi6bisAspEvOGMa4",    //android key
        authDomain: "learnwithme-98129.firebaseapp.com",
        databaseURL: "https://learnwithme-98129.firebaseio.com",
        projectId: "learnwithme-98129",
        storageBucket: "learnwithme-98129.appspot.com",
        messagingSenderId: "1032899670271"
    };
    firebase.initializeApp(config);
}());

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