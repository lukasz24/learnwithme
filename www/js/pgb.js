function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
	
}

function onDeviceReady() {
	navigator.notification.beep(2);
	deviceInfo();
	

}

function deviceInfo() {

	info =  'Device Model   : '    + device.model + '<br>' + 
			'Device Name    : '     + device.name + '<br>' + 
			'Device Cordova : '  + device.cordova + '<br>' + 
			'Device Platform: ' + device.platform + '<br>' + 
			'Device UUID    : '     + device.uuid + '<br>' + 
			'Device Version : '  + device.version + '<br>';

	document.getElementById("deviceDetails").innerHTML = info;	
}

function showInterests(){
	$("#myInterests").text("Programming, gaming and eating.");
}

function approveForm(){
	
	$("#pageone").append("<a href='#pagetwo' style='display: none;' id='goToPageTwo' ></a>");
	$("#goToPageTwo").click();
	$("#goToPageTwo").remove();
	var firstName = $("#nameInput");
	var name = $("#nameInput").val().substring(0,1).toUpperCase() + $("#nameInput").val().substring(1, $("#nameInput").lenght).toLowerCase() 
		+ " " + $("#surnameInput").val().substring(0,1).toUpperCase() + $("#surnameInput").val().substring(1, $("#surnameInput").lenght).toLowerCase();
	$("#fullName").text("Your Name: " + name);

	$("#dateLi").text("Date: " + $("#date").val());
	$("#fruitLi").text("Fruit: " + $("#select-choice-1").val());
	$("#quantityLi").text("Quantity: " + $("#quantity").val());
}
function setMainContent(idcon){
	var mainContent = $('#mainG');
	var recipeCon = mainContent.children().first();
	
	if(recipeCon.attr('id') === undefined){		
		var recipe = $(idcon);	
		mainContent.html(recipe);
	}else{
		//console.log("Niepuste");
		var currentId = '#' + recipeCon.attr('id');
		
		if(currentId != idcon){
			var oldRecipe = $(currentId);
			$('#ps2').append(oldRecipe);
			mainContent.empty();
			var recipe = $(idcon);	
			mainContent.html(recipe);
		}
		
	}	
	
}