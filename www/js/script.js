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
    const btnRegis = document.getElementById("zarejestruj");
    const logout = document.getElementById("wyloguj");

    //EVENT LISTENER DO LOGOWANIA
    btnLogIn.addEventListener('click', function() {
        const email = emailInput.value;
        const passwd = passInput.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, passwd);
        var info = document.getElementById('logInfo');
        info.style.color = "red";
        promise.catch(e => {
            console.log(e.code);
  		    switch (e.code){
  				case "auth/invalid-email":
  					info.innerText = "Niepoprawny email!";
  					emailInput.style.border = "3px solid #ff7777";  					
  					console.log(e.code);
  					break;
  				case "auth/user-not-found":
  					info.innerText = "Niepoprawny email!";
  					emailInput.style.border = "3px solid #ff7777";  					
  					console.log(e.code);
  					break;  				
  				case "auth/email-already-in-use":
  					info.innerText = "Email jest już w użyciu!";
  					emailInput.style.border = "3px solid #ff7777";  
  					console.log(e.code);
  					break;
  				case "auth/wrong-password":
  					info.innerText = "Niepoprawne hasło!"
  					passInput.style.border = "3px solid #ff7777";
  					console.log(e.code);
  					break;
  				default:
    				info.innerText = "Nieokreślony błąd.";
    				console.log(e.code);
    				break;
  			}
  	    });
        info.innerText = "";
        passInput.style.border = "0px solid #ff7777";
        emailInput.style.border = "0px solid #ff7777";

    });

    //EVENT LISTENER DO LOGOWANIA PRZEZ GOOGLE
    btnGLogIn.addEventListener('click', function() {
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
    });

    //EVENT LISTENER DO LOGOWANIA PRZEZ GOOGLE
    btnFBLogIn.addEventListener('click', function() {
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
    });

    //EVENT LISTENER DO REJESTRACJI
    btnRegis.addEventListener('click', function() {
  	 	const emailRegInput = document.getElementById('emailreg');
  	 	const emailReg = emailRegInput.value;
  	 	const passwdReg1Input = document.getElementById('hasloreg');
  	 	const passwdReg1 = passwdReg1Input.value;
  	 	const passwdReg2Input = document.getElementById('haslopowtreg');
  	 	const passwdReg2 = passwdReg2Input.value;
  	 	var info = document.getElementById('regInfo');
  	 	info.style.color = "red";
  	 	if(passwdReg1 === passwdReg2){
  	 	    const auth = firebase.auth();
  	 	    const promise = auth.createUserWithEmailAndPassword(emailReg, passwdReg1);
            promise.catch(e => {
                switch (e.code){
                    case "auth/invalid-email":
                        info.innerText = "Niepoprawny email!";
                        emailRegInput.style.border = "3px solid #ff7777";
                        console.log(e.code);
                        break;
                    case "auth/weak-password":
                        info.innerText = "Hasło musi zawierać co najlniej 6 znaków!";
                        passwdReg1Input.style.border = "3px solid #ff7777";
                        passwdReg2Input.style.border = "3px solid #ff7777";
                        console.log(e.code);
                        break;
                    case "auth/email-already-in-use":
                        info.innerText = "Email jest już w użyciu!";
                        emailRegInput.style.border = "3px solid #ff7777";
                        passwdReg1Input.style.border = "0px solid #ff7777";
                        passwdReg2Input.style.border = "0px solid #ff7777";
                        console.log(e.code);
                        break;
                    default:
                        info.innerText = "Nieokreślony błąd.";
                        console.log(e.code);
                        break;
                }
            });
            promise.then(function() {
                info.innerText = "";
                emailRegInput.style.border = "0px solid #ff7777";
                passwdReg1Input.style.border = "0px solid #ff7777";
                passwdReg2Input.style.border = "0px solid #ff7777";
                goToSite('afterRegPage');
            });
        } else {
            console.log("Hasła są niepoprawne");
            info.innerText = "Hasła nie są identyczne!";
            passwdReg1Input.style.border = "3px solid #ff7777";
            passwdReg2Input.style.border = "3px solid #ff7777";
        }
    });

    //EVENT LISTENER ZMIANY STATUSU ZALOGOWANIA
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
        } else {
            console.log("User not logged in");
        }
    });

    //EVENT LISTENER DO WYLOGOWANIA
    logout.addEventListener('click', function(){
        firebase.auth().signOut()
            .then(function() {
                console.log('Signout Succesfull')
            }, function(error) {
                console.log('Signout Failed')
            });
    });
});

function getChartData() {
  var database = firebase.database().ref();  
  var ilosc = [0,0,0,0,0,0,0];
  var daty = ['','','','','','',''];     
    database.child('classifieds/').once("value", function(data) {
      var newAnn = data.val();
      for(i = 0; i < 7; i++){ 
        let today = getYesterdayDate(i);
        daty[i] = today;
        for(iter in newAnn){
          var dat = newAnn[iter].addDate;
          if(dat == today){
            ilosc[i] = ilosc[i] + 1;            
          }          
        }   
      }
      chartClick(ilosc, daty);
    });
}

function getYesterdayDate(yesDay){
  let nowaData = new Date();
  nowaData.setDate(nowaData.getDate() - yesDay);
  var dd = nowaData.getDate();
  var mm = nowaData.getMonth()+1; 
  var yyyy = nowaData.getFullYear();
  if(dd<10){
    dd='0'+dd;
  } 
  if(mm<10){
    mm='0'+mm;
  } 
  let propFormat = dd + '-' + mm + '-' + yyyy;
  return propFormat;
}

function chartClick(dbData, days){
  var ctx = document.getElementById("chart").getContext('2d');
  var il = dbData;
  var d = days;
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: [d[0], d[1], d[2], d[3], d[4], d[5], d[6]],
        datasets: [{
            label: 'ilość dodanych ogłoszeń',
            data: [il[0], il[1], il[2], il[3], il[4], il[5], il[6], 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(123, 232, 157, 0.8)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(123, 232, 157, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
      legend: {
          labels: {
            boxWidth: 0,
          }
        },
        scales: {
            yAxes: [{}]
        }
    }
  });
}