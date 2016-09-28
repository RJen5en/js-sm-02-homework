$(document).ready(function(){


	for ( var i = 98 ; i > 1 ; i -- ) {

		$('div.bottles').append( '<h1> ' + i + ' bottles of beer on the wall, ' + i + ' bottles of beer. <br> Take one down and pass it around, ' + (i - 1) + ' bottles of beer on the wall.</h1>');
	};

	$('div.bottles').append( '<h1><strong> Get more beer!</strong></h1>');
	

});