$(document).ready(function(){

	$('input#makeLetter').click(function(){

		$( "p" ).empty();

		// var Adjective = $('input#adjective').val();
		
		var texts = new Array( 1 , 2 , 3 , 4 , 5 , 6 , 7 );

		var adjective1 = $('input#adjective1').val();
		var adjective2 = $('input#adjective2').val();
		var adjective3 = $('input#adjective3').val();
		var adjective4 = $('input#adjective4').val();
		var adjective5 = $('input#adjective5').val();
		var adjective6 = $('input#adjective6').val();
		var adjective7 = $('input#adjective7').val();
		var adjective8 = $('input#adjective8').val();
		var adjective9 = $('input#adjective9').val();

		var company = $('input#company').val();
		var animal = $('input#animal').val();

		var noun1 = $('input#noun1').val();
		var noun2 = $('input#noun2').val();
		var noun3 = $('input#noun3').val();
		var noun4 = $('input#noun4').val();
		var noun5 = $('input#noun5').val();

		var adverb1 = $('input#adverb1').val();
		var adverb2 = $('input#adverb2').val();

		var occupation1 = $('input#occupation1').val();
		var occupation2 = $('input#occupation2').val();
		var occupation3 = $('input#occupation3').val();
		var occupation4 = $('input#occupation4').val();
		var verbEd1 = $('input#verbEd1').val();
		var verbEd2 = $('input#verbEd2').val();
		var verbIng = $('input#verbIng').val();
		var friendsName = $('input#friendsName').val();
		var yourName = $('input#yourName').val();
		var movieName = $('input#movieName').val();

		var time = $('input#time').val();

		var occupation1 = $('input#occupation1').val();
		var occupation2 = $('input#occupation2').val();
		var occupation3 = $('input#occupation3').val();
		var occupation4 = $('input#occupation4').val();

		texts[0] = 	'Dear ' + company + ':';

		texts[1] = friendsName + ' worked for me as my assistant for ' + time + '. I recommend her without ' + noun1 +  '\'s for the ' + occupation1 + ' program.';

		texts[2] = 'While working in ' + noun1 + ' production, I often relied on ' + friendsName + ' to put together ' + adjective1 + ' presentations, for which she described and ' + verbEd1 + ' the artistic approach to the project, researching ' + noun2 + '\'s and photographic ' + adjective2 + ' materials. Her creativity, resourcefulness and ability to see a project through really made these presentations ' + adjective3 + ' and ' + adjective4 + ' .';

		texts[3] = 'When we went into production on the feature film ' + movieName + ', ' + friendsName + ' was able to observe every ' + noun3 + ' of the process, ' + verbIng + ' in on meetings and working with ' + animal + '\'s in all areas of the production from the moment the production was set in motion through the release of the film ' + time + ' later.';

		texts[4] = 'During this time, she was an ' + adjective5 + ' ' + occupation2 + ', often serving as my liason to scattered ' + noun3 + '\'s of the crew. She also coordinated projects involving ' + adjective6 + ' people, and her ability to work ' + adverb1 + ' while guiding the project quickly and ' + adverb2 + ' was ' + adjective7 + '. For example, when we suddenly needed to reconceive several action ' + noun5 + '\'s that had already been storyboarded, ' + friendsName + ' quickly found a new storyboard ' + occupation3 + ' on location and worked with him, the stunt coordinator and the ' + occupation4 + ' thorugh several drafts to make sure the new ' + noun5 + 's worked, and then ' + verbEd1 + ' with crew ' + noun3 + 's from all departments, making sure everyone was up-to-date on the changes that were relevant to them. She even ' + verbEd2 + ' in to draw a few last-minute ' + adjective8 + ' changes herself.';

		texts[5] =  friendsName + '\'s sensitivity, ' + noun1 + ', energy and sense of ' +  noun2 + ' made working with her a/an ' + noun3 + '. I highly recommend her as a/an ' + adjective9 + ' addition to the program.';

		texts[6] = 'Sincerely,';

		texts[7] = yourName;

		$(texts).each(function(index, text){

			$('div.output').append('<p>' + text + '</p>');

		});

	});


});