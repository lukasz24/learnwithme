var database = firebase.database().ref();


var addAnnoun = function(){
	var tagi = $('#tagsNewAnn');
	var dateAnn = $('#dateNewAnn');
	var startTime = $('#startTimeNewAnn');
	var endTime = $('#endTimeNewAnn');
	var placeAnn = $('#placeNewAnn');
	var description = $('#descriptionAnn');

	var dateAdd = currentDate();

	var tagiS = tagi.val();
	var dateAnnS = dateAdd;
	var startTimeS = startTime.val();
	var endTimeS = endTime.val();
	var placeAnnS = placeAnn.val();
	var descriptionS = description.val();

	var validateInfo = $('#newAnnInfo').css("color", "red");

	if(tagiS.length == 0 || dateAnnS.length == 0 || 
		startTimeS.length == 0 || endTimeS.length == 0 || 
		placeAnnS.length == 0 || descriptionS.length == 0){
		console.log("Nie wszystkie pola są wypełnione!");
		validateInfo.text("Proszę uzupełnić puste pola!");
	}else{
		var announData = {
		tags: tagiS,
		date: dateAnnS,
		startTime: startTimeS,
		endTime: endTimeS,
		place: placeAnnS,
		description: descriptionS,
		addDate: dateAdd,
		lastEdit: dateAdd,
		active: true
	};

		var newKey = firebase.database().ref().child('classifieds').push().key;
		console.log(newKey);	
		database.child('/classifieds/' + newKey).set(announData);
		goToSite('mainAdd');
		tagi.text("");
		dateAnn.text("");
		startTime.text("");
		endTime.text("");
		placeAnn.text("");
		description.text("");
		validateInfo.text("");
	}
	
}

function currentDate() {
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = ((''+day).length<2 ? '0' : '') + day + '-' + 
					((''+month).length<2 ? '0' : '') + month + 
					'-' + d.getFullYear();	

	return output;
}
$(document).ready(function(){
	var mainCont = $("#mainAll > div[data-role='main']");
	
	database.child('classifieds/').on("child_added", function(data, prevChildKey){
		var newAnn = data.val();
		mainCont.append("<div class='container'><span class='annKey'>" + data.key + "</span><p class='infoAboutMeeting'>" +
			newAnn.date + " " + newAnn.startTime + "-" + newAnn.endTime + 
			"<br>" + newAnn.place + "<br>" + newAnn.tags +  
			"</p><img src='img/greyBook.png' class='bookic'/><p class='undimg'></p></div>");
		
	});
});

function getAllAnn(){
	
	var mainCont = $("#mainAll > div[data-role='main']");
	
	database.child('classifieds/').on("child_added", function(data, prevChildKey){
		var newAnn = data.val();
		mainCont.append("<div class='container'><span class='annKey'>" + data.key + "</span><p class='infoAboutMeeting'>" +
			newAnn.date + " " + newAnn.startTime + "-" + newAnn.endTime + 
			"<br>" + newAnn.place + "<br>" + newAnn.tags +  
			"</p><img src='img/greyBook.png' class='bookic'/><p class='undimg'></p></div>");
	
	console.log(prevChildKey);
		console.log('dodano nowe ogłoszenie!');
		console.log(data);

	});
	
	
}

}