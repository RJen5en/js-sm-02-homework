$(document).ready(function(){

	$('input#makeLib').click(function(){

		var adjective = $('input#adjective').val();

		var animal = $('input#animal').val();

		var noun = $('input#noun').val();

		var noise = $('input#noise').val();

		var text =  adjective + ' Macdonald had a ' + noun + ', E-I-E-I-O and on that ' + noun + ' he had an ' + animal + ', E-I-E-I-O with a ' + noise + ' ' + noise + ' here and a ' + noise + ' ' + noise + ' there, here a ' + noise + ', there a ' + noise + ', everywhere a ' + noise + ' ' + noise + ', ' + adjective + ' Macdonald had a ' + noun + ', E-I-E-I-O.';

		$('div.libs').append('<p>' + text + '</p>');

	});


});