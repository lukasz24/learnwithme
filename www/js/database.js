var database = firebase.database().ref();

var addNewAnn = function() {
    goToSite('addAnnoun');
    $('#tagsNewAnn').val("");
    $('#dateNewAnn').val("");
    $('#startTimeNewAnn').val("");
    $('#endTimeNewAnn').val("");
    $('#placeNewAnn').val("");
    $('#descriptionAnn').val("");
};

var addAnnoun = function() {
	var tagi = $('#tagsNewAnn');
	var dateAnn = $('#dateNewAnn');
	var startTime = $('#startTimeNewAnn');
	var endTime = $('#endTimeNewAnn');
	var placeAnn = $('#placeNewAnn');
	var description = $('#descriptionAnn');

	dateAnn.on('focus', function(){
		dateAnn.css("border", "solid 0px transparent");
	});
	startTime.on('focus', function(){
		startTime.css("border", "solid 0px transparent");
	});
	endTime.on('focus', function(){
		endTime.css("border", "solid 0px transparent");
	});
	var dateAdd = formatDate(new Date());

	var tagiS = tagi.val();
	var dateAnnS = formatDate(new Date(dateAnn.val()));
	var startTimeS = startTime.val();
	var endTimeS = endTime.val();
	var placeAnnS = placeAnn.val();
	var descriptionS = description.val();

	var userID = firebase.auth().currentUser.uid;

	var validateInfo = $('#newAnnInfo').css("color", "red");
	console.log(validateTime(startTimeS, endTimeS));
		console.log(validateDate(new Date(dateAnn.val()), startTimeS));
	if (tagiS.length == 0 || dateAnnS.length == 0 ||
		startTimeS.length == 0 || endTimeS.length == 0 || 
		placeAnnS.length == 0 || descriptionS.length == 0) {
		console.log("Nie wszystkie pola są wypełnione!");
		validateInfo.text("Proszę uzupełnić puste pola!");
		scrollTo(validateInfo);
	} else if(validateTime(startTimeS, endTimeS) && validateDate(new Date(dateAnn.val()), startTimeS)) {
		var announData = {
			tags: tagiS,
			date: dateAnnS,
			startTime: startTimeS,
			endTime: endTimeS,
			place: placeAnnS,
			description: descriptionS,
			addDate: dateAdd,
			lastEdit: dateAdd,
			active: true,
			author: userID,
			followersNumb: 0,
			followsBy: {}
		};

		var newKey = firebase.database().ref().child('classifieds').push().key;
		
		var shortData = newKey;
		database.child('/classifieds/' + newKey).set(announData);		
		database.child('/users/' + userID + '/added/' + shortData).set(shortData);		
		getMyAnn();
		tagi.text("");
		dateAnn.text("");
		startTime.text("");
		endTime.text("");
		placeAnn.text("");
		description.text("");
		validateInfo.text("");
		dateAnn.off('focus');
		startTime.off('focus');
		endTime.off('focus');
	}else {
		validateInfo.html("Upewnij się czy wprowadzona <strong>data</strong> jest dniem dzisiejszym, a godzina <strong>rozpoczęścia</strong> <br>jest wcześniejszą niż <strong>zakończenia</strong> oraz czy już nie <strong>minęła.</strong>")
		scrollTo(validateInfo);
	}
};
function validateTime(sTime, eTime){	
	sTime = sTime.split(":");
	sTime = sTime[0]+sTime[1];
	eTime = eTime.split(":");
	eTime = eTime[0]+eTime[1];	
	if(sTime < eTime){
		return true;
	}else{
		$('#endTimeNewAnn').css("border", "solid 1px red");
		$('#startTimeNewAnn').css("border", "solid 1px red");
		return false;
	}
}
function validateDate(inputDate, sTime){
	let cdate = new Date();
	sTime = sTime.split(":");
	inputDate.setHours(sTime[0]);
	inputDate.setMinutes(sTime[1]);
	if(inputDate >= cdate){
		return true;
	}else{
		$('#dateNewAnn').css("border", "solid 1px red");
		$('#endTimeNewAnn').css("border", "solid 1px red");
		$('#startTimeNewAnn').css("border", "solid 1px red");
		return false;
	}	
}
function scrollTo(target){
	if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 500);
		}
}
function formatDate(date) {
    var month = date.getMonth()+1;
    var day = date.getDate();

    var output = ((''+day).length<2 ? '0' : '') + day + '-' +
        ((''+month).length<2 ? '0' : '') + month +
        '-' + date.getFullYear();

    return output;
}

function getAllAnn() {
	cordova.plugins.notification.local.schedule({
    title: 'My first notification',
    text: 'Thats pretty easy...',
    foreground: true
	});
	
	goToSite('mainAll');
	
}
function getMyAnn() {
	var mainContAdd = $("#mainAdd > div[data-role='main']");
	mainContAdd.empty();
	var firstInfo = '<p id="comAdd">Nie dodałeś/dodałaś jeszcze żadnego ogłoszenia.<br> Zmień to klikając przycisk + u dołu ekranu.</p>';	
    mainContAdd.append(firstInfo);
    database.child('users/' + firebase.auth().currentUser.uid + "/added").once("value", function(data) {
		//console.log(data.val());
			if (data.val() != null){
				$('#comAdd').hide();
				var announ = data.val();
				for(iter in announ){
					database.child('classifieds/' + iter).once("value").then(function(snapshot) {
						var newAnn = snapshot.val();				
						if(newAnn.active){
							var content = "<div class='container' onclick='showMyAnnoun(\"" + snapshot.key + "\", \"#mainAdd\")'><span class='annKey'>" + snapshot.key + "</span><p class='infoAboutMeeting'>" +
							newAnn.date + " " + newAnn.startTime + "-" + newAnn.endTime + 
									"<br>" + newAnn.place + "<br>" + newAnn.tags +  
									"</p><img src='img/greenBook.png' class='bookic'/><p class='undimg'>" + newAnn.followersNumb + "</p></div>";
							if(mainContAdd.is(':empty')){
								mainContAdd.append(content);
							}else{
								mainContAdd.children().first().before(content);
							}
						}	
					});
				}
			}
		});
	goToSite('mainAdd');
}

function getMyWatched() {
	var mainContWatch = $("#mainWatched > div[data-role='main']");
	mainContWatch.empty();
	var firstInfoWat = '<p id="comWatched">Nie obserwujesz obecnie żadnych ogłoszeń.<br>Wróć do widoku wszystkich ogłoszeń, wybierz najbardziej interesujące, przejdź do szczegółów i kliknij ikonę książki, aby dodać to ogłoszenie do obserwowanych.</p>';
	mainContWatch.append(firstInfoWat);
	database.child('users/' + firebase.auth().currentUser.uid + "/watched").once("value", function(data) {
		
		if (data.val() != null) {
			var announ = data.val();
			$('#comWatched').hide();
			for(iter in announ){
				database.child('classifieds/' + iter).once("value").then(function(snapshot) {				
					var newAnn = snapshot.val();
					if(newAnn.active){
						var contentWat = "<div class='container' onclick='showThisAnnoun(\"" + snapshot.key + "\", \"#mainWatched\")'><span class='annKey'>" + snapshot.key + "</span><p class='infoAboutMeeting'>" +
							newAnn.date + " " + newAnn.startTime + "-" + newAnn.endTime + 
							"<br>" + newAnn.place + "<br>" + newAnn.tags +  
							"</p><img src='img/greenBook.png' class='bookic'/><p class='undimg'>" + newAnn.followersNumb + "</p></div>";
						if(mainContWatch.is(':empty')){				
							mainContWatch.append(contentWat);
						}else{
							mainContWatch.children().first().before(contentWat);					
						}
					}				
				});
			}
		}
	});
	goToSite('mainWatched');
	
}


function showThisAnnoun(key, back){
	switch(back){
		case '#mainAll':
			$('#detailBackAll').show();
			$('#detailBackWat').hide();
			break;
		case '#mainWatched':
			$('#detailBackWat').show();
			$('#detailBackAll').hide();
			break;
		default:
			$('#detailBackAll').show();
			$('#detailBackWat').hide();
	}
	var annKey = key;
	var usId = firebase.auth().currentUser.uid;
	goToSite('AnnDetailsPage');	
	//$('#detailBack').attr('href', back);
	$('#annKeyDetail').text(annKey);
	var myWatchKey = [];
	database.child('classifieds/' + annKey).once("value").then(function(snapshot) {
		//console.log(snapshot.val());
		var newAnn = snapshot.val();
		database.child('users/' + newAnn.author).once("value").then(function(snapshot) {$('#usersAnnDetails').text('Ogłoszenie użytkownika ' + snapshot.val().name);});
		$('#dateDetails').text(newAnn.date);				
		$('#startTimeDetails').text(newAnn.startTime);
		$('#endTimeDetails').text(newAnn.endTime);
		$('#placeDetails').text(newAnn.place);
		$('#descDetails').text(newAnn.description);
		$('#tagsDetails').text(newAnn.tags);
		$('#followersNumb').text(newAnn.followersNumb);
		//database.child('users/' + usId + "/watched/" + key).on('value', function(snap) { myAnn = snap.val(); });
				
		database.child('users/' + usId + "/watched/" + key).once("value").then(function(snapshot) {
			myWatchKey = snapshot.val();
			//console.log(myWatch);		
			if(myWatchKey != null){
				$('#imgDetails').attr('src', 'img/greenBook-big.png');
			}
		});				
	});
}

function toogleWatch(){
	var newKey = $('#annKeyDetail').text();
	var myWatch;
	var usId = firebase.auth().currentUser.uid;
	var follNum = $('#followersNumb');
	database.child('users/' + usId + "/watched/" + newKey).once("value").then(function(snapshot) {
		myWatch = snapshot.val();		
		if(myWatch == null){
			database.child('/classifieds/' + newKey + '/followsBy/' + usId).set(usId).then(function() {
			    //console.log("Remove succeeded.")
			    database.child('/classifieds/' + newKey + '/followersNumb').transaction(function(currentRank) {
			    	follNum.text(currentRank + 1);
				  return currentRank + 1;
				});
			  })
			  .catch(function(error) {
			    //console.log("Remove failed: " + error.message)
			  });
			database.child('/users/' + usId + '/watched/' + newKey).set(newKey);			
			$('#imgDetails').attr('src', 'img/greenBook-big.png');
		}else{
			database.child('/classifieds/' + newKey + '/followsBy/' + usId).remove().then(function() {
			    //console.log("Remove succeeded.")
			    database.child('/classifieds/' + newKey + '/followersNumb').transaction(function(currentRank) {
			    	follNum.text(currentRank - 1);
				  return currentRank - 1;
				});
			  })
			  .catch(function(error) {
			    //console.log("Remove failed: " + error.message)
			  });
			database.child('/users/' + usId + '/watched/' + newKey).remove();			
			$('#imgDetails').attr('src', 'img/128greybook.png');
		}		
	});
}

function showMyAnnoun(key, back){
	switch(back){
		case '#mainAll':
			$('#myDetailBackAll').show();
			$('#myDetailBackMy').hide();
			break;
		case '#mainAdd':
			$('#myDetailBackMy').show();
			$('#myDetailBackAll').hide();
			break;
		default:
			$('#myDetailBackAll').show();
			$('#myDetailBackMy').hide();
	}
	var myAnnKey = key;
	var myId = firebase.auth().currentUser.uid;
	goToSite('MyAnnDetailsPage');	
	//$('#detailBack').attr('href', back);
	$('#myAnnKeyDetail').text(myAnnKey);
	var myWatchKey = [];
	database.child('classifieds/' + myAnnKey).once("value").then(function(snapshot) {
		//console.log(snapshot.val());
		var myAnnKey = snapshot.val();
		database.child('users/' + myAnnKey.author).once("value").then(function(snapshot) {$('#usersAnnMyDetails').text('Ogłoszenie użytkownika ' + snapshot.val().name);});
		$('#dateMyDetails').text(myAnnKey.date);				
		$('#startTimeMyDetails').text(myAnnKey.startTime);
		$('#endTimeMyDetails').text(myAnnKey.endTime);
		$('#placeMyDetails').text(myAnnKey.place);
		$('#descMyDetails').text(myAnnKey.description);
		$('#tagsMyDetails').text(myAnnKey.tags);
		$('#myFollowersNumb').text(myAnnKey.followersNumb);
		//database.child('users/' + usId + "/watched/" + key).on('value', function(snap) { myAnn = snap.val(); });				
	});
}

function changeStatus(back){
	var newKey = $('#myAnnKeyDetail').text();
	database.child('/classifieds/' + newKey).update({active: false});
	switch (back){
		case '#MyAnnDetailsPage':
			showMyAnnoun(newKey);
		default:
		getMyAnn();
	}
	
}
