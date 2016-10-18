$(document).ready(function(){

	// Start with this URL
	var url = 'http://api.openweathermap.org/data/2.5/weather?zip=%ZIPCODE%&APPID=6f181e7b8887bcb10a67c2bb33487822&units=imperial';


	$('input#getWeather').click(function(e){
		var zipCode = $('input#zipCode').val();

		if( isNaN( zipCode ) || zipCode.length != 5 ){

			alert("Please enter a valid zip code");
			return;

		}

		var parsedUrl = url.replace('%ZIPCODE%', zipCode);
		console.log( parsedUrl );

		var showWeather = $.getJSON(parsedUrl, function(data) {

			$('h2').empty().append( data.name + " is " + data.main.temp + " degrees");

			//Warm or Cold
			if (data.main.temp > 50) {
				$('body').addClass('warm');
			}
			else {
				$('body').addClass('cold');
			}

			//Sunrise and Sunset
			var sunRise = new Date(data.sys.sunrise * 1000);
			var sunSet = new Date(data.sys.sunset * 1000);

			$('h3').empty().append( 'Sunrise: ' + sunRise + '<br>Sunset: ' + sunSet);

		});
	});

});




	// When a user clicks the input that reads "submit" get a JSON feed from the open weather API using the URL above

	// you'll notice that i included a placeholder "%ZIPCODE%"

	// get the user entered zip code and do a find and replace on the URL with the correct ZIP value

	// If the users enters a zipcode containing letters you should stop the function and prompt the user Pop Alert up
	
	// Print West Hollywood is 59˚ degrees in the h2 once you've retrieved the JSON

	// If the temperature is greater than 50 degrees add the "warm" class to the body

	// If the temperature is less than 50 add the cool class to the body

	// Reference this: $.getJSON for more information

	// Reference .replace to find & replace
