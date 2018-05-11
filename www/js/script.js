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
    const emailInput = $('#email');
    const passInput = $('#haslo');
    const btnLogIn = $('#zaloguj');
    const btnGLogIn = $("#zalogujG");
    const btnFBLogIn = $("#zalogujFB");
    const btnRegis = $("#zarejestruj");
    const logout = $("#wyloguj");
    var info = $('#logInfo');

    emailInput.on('focus', function(){
		$(this).css("box-shadow", "none");
	});
    passInput.on('focus', function(){
		$(this).css("box-shadow", "none");
	});
    //EVENT LISTENER DO LOGOWANIA
    btnLogIn.on('click', function() {
        const email = emailInput.val();
        const passwd = passInput.val();
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, passwd);
        
        info.css("color", "red");

        promise.catch(e => {
            //console.log(e.code);
  		    switch (e.code){
            case "auth/invalid-email":
              info.text("Niepoprawny email!");
              emailInput.css("box-shadow", "2px 2px 2px red");  					
              console.log(e.code);
              break;
            case "auth/user-not-found":
              info.text("Niepoprawny email!");
              emailInput.css("box-shadow", "2px 2px 2px red");  					
              console.log(e.code);
              break;  				
            case "auth/email-already-in-use":
              info.text("Email jest już w użyciu!");
              emailInput.css("box-shadow", "2px 2px 2px red");  
              console.log(e.code);
              break;
            case "auth/wrong-password":
              info.text("Niepoprawne hasło!");
              passInput.css("box-shadow", "2px 2px 2px red");
              console.log(e.code);
              break;
            case "":
            info.html('Logowanie udane!');
              
              break;
            default:
    		  info.text("Nieokreślony błąd.");
    		  console.log(e.code);
    		  break;
  			}
  			
		});	
		promise.then(function(res){
			//console.log(res);
			getAllAnn();
            info.text("");
            emailInput.val('').off('focus');
    	 	passInput.val('').off('focus');
		});
	});
    /*
  	//EVENT LISTENER DO PRZEJSCIA DO SERWISU
	  continueBtn.on('click', function() {
        getAllAnn();
    });	  
	*/
    //EVENT LISTENER DO LOGOWANIA PRZEZ GOOGLE
    btnGLogIn.on('click', function() {
        
        	
        info.html("Próba logowania do Google...");
        var provider = new firebase.auth.GoogleAuthProvider();
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
    btnFBLogIn.on('click', function() {
        info.html("Próba logowania do FB...");
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
	btnRegis.on('click', function() {		
		var nickReg = $('#nickreg').val();
		const emailRegInput = $('#emailreg');
		const emailReg = emailRegInput.val();
		const passwdReg1Input = $('#hasloreg');
		const passwdReg1 = passwdReg1Input.val();
		const passwdReg2Input = $('#haslopowtreg');
		const passwdReg2 = passwdReg2Input.val();
		if (nickReg == null || nickReg == "") {
		    nickReg = emailReg.substring(0, emailReg.indexOf('@'));
	    }
		var info = document.getElementById('regInfo');
		info.style.color = "red";
		if (passwdReg1 === passwdReg2) {
			const auth = firebase.auth();
			const promise = auth.createUserWithEmailAndPassword(emailReg, passwdReg1);
			promise.catch(e => {
				switch (e.code){
					case "auth/invalid-email":
						info.text("Niepoprawny email!");
						emailRegInput.css("border", "3px solid #ff7777");
						console.log(e.code);
						break;
					case "auth/weak-password":
						info.text("Hasło musi zawierać co najlniej 6 znaków!");
						passwdReg1Input.css("border", "3px solid #ff7777");
						passwdReg2Input.css("border", "3px solid #ff7777");
						console.log(e.code);
						break;
					case "auth/email-already-in-use":
						info.text("Email jest już w użyciu!");
						emailRegInput.css("border", "3px solid #ff7777");
						passwdReg1Input.css("border", "0px solid #ff7777");
						passwdReg2Input.css("border", "0px solid #ff7777");
						console.log(e.code);
						break;
					default:
						info.text("Nieokreślony błąd.");
						console.log(e.code);
						break;
				}
			});
			promise.then(function(){
				info.innerText = "";
				emailRegInput.css("border", "0px solid #ff7777");
				passwdReg1Input.css("border", "0px solid #ff7777");
				passwdReg2Input.css("border", "0px solid #ff7777");
				addUserToDB(emailReg, nickReg, firebase.auth().currentUser.uid);
				goToSite('afterRegPage');
			});
		} else {
			console.log("Hasła są niepoprawne");
			info.text("Hasła nie są identyczne!");
			passwdReg1Input.css("border", "3px solid #ff7777");
			passwdReg2Input.css("border", "3px solid #ff7777");
		}
	});
  
  function addUserToDB(email, nick, userKey){	
    var userData = {
      email: email,
      name: nick,
      watched: [],
      added: []
    };
    firebase.database().ref().child('users/' + userKey).set(userData);
  }

    //EVENT LISTENER ZMIANY STATUSU ZALOGOWANIA
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
        } else {
            console.log("User not logged in");
        }
    });


  /*
    //EVENT LISTENER DO WYLOGOWANIA
    logout.addEventListener('click', function(){
        firebase.auth().signOut()
            .then(function() {
                console.log('Signout Succesfull')
            }, function(error) {
                console.log('Signout Failed')
            });
    });
    */
});

function logout(){
    	firebase.auth().signOut()
            .then(function() {
                console.log('Signout Succesfull');
                goToSite('startPage');
            }, function(error) {
                console.log('Signout Failed')
            });
    }

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
  let propFormat = yyyy + '-' + mm + '-' + dd;
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

function sendMail()
{
  alert('Wszelkie problemy i pytania proszę zgłaszać na adres e-mail: pomoc@pomoc.com');
  /* not working, not sure why
  navigator.notification.alert(
    'Wszelkie problemy i pytania proszę zgłaszać na adres e-mail: pomoc@pomoc.com', 
    null, 
    "Kontakt", 
    "Ok");
  */

}