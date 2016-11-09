$(document).ready(function(){

	console.log('start');
	$.ajax({
		
		url: 'http://www.kameronzach.com/todo/api/',
		method:'get', 
		data: { action: 'displayList', 'list_id': 30, 'token': '58097ca86f03c'},
		dataType: 'json',
		success: function(data) {

			//console.log(data.items);
			$(data.items).each(function(index, value){
				//console.log(value);
				addItem(value.text, value.id, value.completed);
			});
			
			console.log(data);
			$('h1').html(data.title);
		}

	})

	function addItem(text, itemId, completed){
		// 3. Make sure input isn't empty INPUT != ''
		if( text == '' ){

			//alert('Yo, we need an item...');
			return;

		}

		var listItemHTML = $('script#listHtml').html();
		var listItemTemplate = Handlebars.compile(listItemHTML);
		var completedBoolean = (completed == "1") ? true : false; 
		var itemData = { listItem: text, deleteText: 'Remove', listItemId: itemId , completed: completedBoolean};
		var newHTML = listItemTemplate( itemData );

		console.log(completed);
		$('ul#list').append( newHTML );

		//input.val('');
		//input.focus();
		
		// 4. Append item to list
	}

	$('#composer').submit(function(e){

		e.preventDefault();

		// 2. Get value from input
		var input = $('input#new-thing');
		var inputValue = input.val();

		$.ajax({
		
			url: 'http://www.kameronzach.com/todo/api/',
			method:'post', 
			data: { action: 'newItem', 'list_id': 30, 'token': '58097ca86f03c', text: inputValue},
			dataType: 'json',
			success: function(data) {
				
				console.log(data);
				addItem(inputValue, data.item_id);

			}

		});

		



	});

	$('#list').on('change', 'input[type=checkbox]', function(){
		var checked = $(this).is(':checked');
		var itemId = $(this).parents('li').data('item-id');

		$.ajax({
			
			url: 'http://www.kameronzach.com/todo/api/',
			method:'post', 
			data: { action: 'updateItemStatus', 'list_id': 30, 'token': '58097ca86f03c', 'item_id': itemId , completed: checked },
			dataType: 'json',
			success: function(data) {
				
				console.log(data);
			    
			}

		});

	});



	$('#list').on('click', 'a.deleteItem', function(event){

		event.preventDefault();

		var itemId = $(this).parents('li').data('item-id'); 
		var list = $(this);

		$.ajax({
		
			url: 'http://www.kameronzach.com/todo/api/',
			method:'post', 
			data: { action: 'deleteItem', 'list_id': 30, 'token': '58097ca86f03c', item_id: itemId},
			dataType: 'json',
			success: function(data) {
				console.log(itemId)
				
				list.parents('li').slideUp(900, function(){

					list.remove();

				});

			}, 
			error:function(){
				alert('Hey something went wrong');
			}

		})

		// $(this).parents('li').remove();
		

	});


	$('input[type=checkbox]').click(function(){

	// 	// check if parent HAS CLASS
	// 	// use item PROP
	// 	// .is


		// if( $(this).parent().hasClass('done') ){
		// 	$(this).parent().removeClass('done');
		// }else{
		// 	$(this).parent().addClass('done');
		// }

	// 	// if( $(this).prop('checked') == true ){
	// 	// 	$(this).parent().removeClass('done');
	// 	// }else{
	// 	// 	$(this).parent().addClass('done');
	// 	// }

	// 	// if( $(this).is(':checked') ){
	// 	// 	$(this).parent().removeClass('done');
	// 	// }else{
	// 	// 	$(this).parent().addClass('done');
	// 	// }

	});

	// Add new list name
	 $('h1').click(function() {
	    var title = prompt("Enter Name of List", "");
	    if (title == "") {
	       return;

	    } 
	    $.ajax({
			
			url: 'http://www.kameronzach.com/todo/api/',
			method:'post', 
			data: { action: 'renameList', 'list_id': 30, 'token': '58097ca86f03c', title: title},
			dataType: 'json',
			success: function(data) {
				
			    $('h1').html(data.title);
			    //console.log(data);
			}

		});
	});


});