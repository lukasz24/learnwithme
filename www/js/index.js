var PobranieDanych = function(){
	// Initialize Firebase
	const config = {
		apiKey: "AIzaSyC2E9hI9X2e2KCHyEiaz5vcaFXOFvY0HQc",
		authDomain: "learnwithme-98129.firebaseapp.com",
		databaseURL: "https://learnwithme-98129.firebaseio.com",
		projectId: "learnwithme-98129",
		storageBucket: "learnwithme-98129.appspot.com",
		messagingSenderId: "1032899670271"
	};
	const auth = firebase.auth();
	
	firebase.initializeApp(config);
	
	const emailreg = document.getElementById('emailreg').value;
	const hasloreg = document.getElementById('hasloreg').value;
	const zarejestruj = document.getElementById('zarejestruj').value;
	
	// rejestracja
	
	zarejestruj.addEventLisener('click', e => {
	// pobranie e mail i hasla
	
	const email = emailreg.value;
	const pass = hasloreg.value;
	const auth = firebase.auth();
	
	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => consloe.log(e.message));
	});
	
}