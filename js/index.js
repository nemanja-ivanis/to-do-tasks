$(document).ready(function(){
	
	//CHECK NUMBER OF TASKS
	/*
	function checkTasks(list_parent){

		return $(list_parent + ' li').length;	
		
	}
	*/


	var source = $("#template").html(); 
	var template = Handlebars.compile(source); 













	//TASK OBJECT CONSTRUCTOR
	var todoTask=function(storage_name,storage_active,storage_completed,storage_favorited){

		this.name=storage_name;
		this.active=storage_active;
		this.completed=storage_completed;
		this.favorited=storage_favorited;

	};


	//var newTask=new todoTask('ime',true,false,false);


	//console.log(newTask.name);
	

	//PULL FROM LOCAL STORAGE AND GENERATE TASKS VIEW
	function showItems(){



		for(var i=0, len=localStorage.length; i<len; i++) {
			//PULL VALUES FROM LOCAL STORAGE
			var key = localStorage.key(i);
			var value = localStorage[key];

			var parsed_obj=JSON.parse(value);

			var task_name=parsed_obj.name;

			var is_completed=parsed_obj.completed;

			var is_active=parsed_obj.active;

			var is_favorited=parsed_obj.favorited;

			

			

			//CHECK DIFFERENT CONDITIONS BEFORE GENERATING TASKS VIEW
			if(i!=0 && is_active && is_favorited){



				/*
				var item = '<li id="'+key+'">';
				item+='<input type="checkbox">';
				item+='<label class="favorited">'+task_name+'</label>';
				item+='<input type="text" class="inputTask">';
				item+='<button class="edit"><span class="glyphicon glyphicon-edit"></span></button>';
				item+='<button class="favorite"><span class="glyphicon glyphicon-star"></span></button>';
				item+='<button class="complete "><span class="glyphicon glyphicon-ok"></span></button>';
				item+='<button class="delete"><span class="glyphicon glyphicon-trash"></span></button>';
				item+='</li>';


				$('ul#all').append(item);
				$('ul#incomplete-tasks').append(item);
				$('ul#favorite-tasks').append(item);
				*/
				var favorite_status='glyphicon-star';
				var complete_status='';

				var data = { 

					task_key:key,
					task_name:task_name,
					favorite_status:'glyphicon-star-empty',
					complete_status:''
				}; 

				$('#all').append(template(data));
				$('#incomplete-tasks').append(template(data));
				$('#favorite-tasks').append(template(data));



			}else if(i!=0 && is_active){


				/*
				var item = '<li id="'+key+'">';
				item+='<input type="checkbox">';
				item+='<label>'+task_name+'</label>';
				item+='<input type="text" class="inputTask">';
				item+='<button class="edit"><span class="glyphicon glyphicon-edit"></span></button>';
				item+='<button class="favorite"><span class="glyphicon glyphicon-star-empty"></span></button>';
				item+='<button class="complete "><span class="glyphicon glyphicon-ok"></span></button>';
				item+='<button class="delete"><span class="glyphicon glyphicon-trash"></span></button>';
				item+='</li>';


				$('ul#all').append(item);
				$('ul#incomplete-tasks').append(item);
				*/
				var favorite_status='glyphicon-star-empty';
				var complete_status='';
				var data = { 

					task_key:key,
					task_name:task_name,
					favorite_status:'glyphicon-star-empty',
					complete_status:''
				}; 
				$('#all').append(template(data));
				$('#incomplete-tasks').append(template(data));
				$('#favorite-tasks').append(template(data));


			}else if(i!=0 && is_completed && is_favorited){


				/*
				var item = '<li id="'+key+'">';
				item+='<input type="checkbox">';
				item+='<label class="completed favorited">'+task_name+'</label>';
				item+='<input type="text" class="inputTask">';
				item+='<button class="edit"><span class="glyphicon glyphicon-edit"></span></button>';
				item+='<button class="favorite"><span class="glyphicon glyphicon-star"></span></button>';
				item+='<button class="complete red"><span class="glyphicon glyphicon-ok"></span></button>';
				item+='<button class="delete"><span class="glyphicon glyphicon-trash"></span></button>';
				item+='</li>';


				$('ul#all').append(item);
				$('ul#completed-tasks').append(item);
				$('ul#favorite-tasks').append(item);
				*/

				var favorite_status='glyphicon-star';
				var complete_status='red';
				var data = { 

					task_key:key,
					task_name:task_name,
					favorite_status:'glyphicon-star-empty',
					complete_status:''
				}; 
				$('#all').append(template(data));
				$('#incomplete-tasks').append(template(data));
				$('#favorite-tasks').append(template(data));


			}else if(i!=0 && is_completed){

				var favorite_status='glyphicon-star-empty';
				var complete_status='red';
				var data = { 

					task_key:key,
					task_name:task_name,
					favorite_status:'glyphicon-star-empty',
					complete_status:''
				}; 
				$('#all').append(template(data));
				$('#incomplete-tasks').append(template(data));
				$('#favorite-tasks').append(template(data));


				/*
				var item = '<li id="'+key+'">';
				item+='<input type="checkbox">';
				item+='<label class="completed">'+task_name+'</label>';
				item+='<input type="text" class="inputTask">';
				item+='<button class="edit"><span class="glyphicon glyphicon-edit"></span></button>';
				item+='<button class="favorite"><span class="glyphicon glyphicon-star-empty"></span></button>';
				item+='<button class="complete red"><span class="glyphicon glyphicon-ok"></span></button>';
				item+='<button class="delete"><span class="glyphicon glyphicon-trash"></span></button>';
				item+='</li>';


				$('ul#all').append(item);
				$('ul#completed-tasks').append(item);

				*/


			}



			
		}

	}
	//CALL FUNCTION ON DOCUMENT READY
	showItems();


	//STORING THE LAST INDEX OF STORAGE ITEMS
	var index = localStorage.getItem('index');
	if(typeof index !== 'undefined' && index !== null){

		var storage_increment=localStorage.getItem('index');
	}else{

		var storage_increment=0;
	}

	console.log(storage_increment);

	//ADD ITEM
	$('button#add').on('click',function(){
		
		var new_task = $('#new-task').val();
		
		if(new_task==='') {
			
			$('.warning').html('<i class="fa fa-warning"></i> No task added').show();
			
			$('.success').hide();
		}else{
			
			$('.success').html('<i class="fa fa-check"></i>Task added to list').fadeIn('slow').delay(500).fadeOut();
			
			$('.warning').hide();
			//INCREMENT INDEX WHEN NEW ITEM ADDED
			storage_increment++;

			localStorage.setItem('index',storage_increment);

			//GENERATE THE VALUE FOR THE TASK
			//var task_value = { 'name': new_task, 'active': true, 'completed': false,'favorited':false };

			var newTaskObj=new todoTask(new_task,true,false,false);

			localStorage.setItem("task-"+storage_increment, JSON.stringify(newTaskObj));


			var data = { 

				task_key:storage_increment,
				task_name:new_task,
				favorite_status:'glyphicon-star-empty',
				complete_status:''
			}; 
				/*
			var new_item = '<li id="task-'+storage_increment+'">';
			new_item+='<input type="checkbox">';
			new_item+='<label>'+new_task+'</label>';
			new_item+='<input type="text" class="inputTask">';
			new_item+='<button class="edit"><span class="glyphicon glyphicon-edit"></span></button>';
			new_item+='<button class="favorite"><span class="glyphicon glyphicon-star-empty"></span></button>';
			new_item+='<button class="complete "><span class="glyphicon glyphicon-ok"></span></button>';
			new_item+='<button class="delete"><span class="glyphicon glyphicon-trash"></span></button>';
			new_item+='</li>';
			*/
      //APPEND TO ALL AND ACTIVE TASKS
      $('ul#all').append(template(data));
      $('ul#incomplete-tasks').append(template(data));
      $('.inputTask').val(new_task);

      $('#new-task').val('');
    };

		//COUNT THE TASKS INSIDE EACH SECTION
		countTask('#counter-all','#all');
		countTask('#counter-active','#incomplete-tasks');
		countTask('#counter-completed','#completed-tasks');
		countTask('#counter-favorite','#favorite-tasks');
		/*
		if(checkTasks('#all')>0){
			if(!$('#delete-all').length){
				$('#all-section').append('<button id="delete-all">Delete All</button>');
			}
			
		}else{

			$('#delete-all').remove();	
		}

		if(checkTasks('#incomplete-tasks')>0){
			if(!$('#delete-all-active').length){
				$('#active-section').append('<button id="delete-all-active">Delete All</button>');
			}
			
		}else{

			$('#delete-all-active').remove();	
		}
		*/




	});
	//END ADD ITEM
	

	//EDIT TASK
	$('ul').on('click', '.edit',function(){


		
		var parent = $(this).parent();


		
		var this_element=$(this);

		var task_id=parent.attr('id');

		var existing_object=localStorage.getItem(task_id);

		var parsed_obj=JSON.parse(existing_object);

		//var task_name=parsed_obj.name;

		var is_active=parsed_obj.active;

		var is_completed=parsed_obj.completed;

		var is_favorited=parsed_obj.favorited;

		
		if(parent.hasClass('editMode')){

			parent.removeClass('editMode');

		}else{

			parent.addClass('editMode');

			
			//ON ENTER KEY UPDATE THE VALUE
			$('.inputTask').keyup(function(e) {
				if(e.keyCode == 13)
				{
					var editTask =this_element.prev('input[type="text"]').val();
					var editLabel = parent.find('label');

					var updatedTaskObj=new todoTask(editTask,is_active,is_completed,is_favorited);

					//var updated_value = { 'name':  editTask, 'active': is_active, 'completed': is_completed,'favorited':is_favorited };

					localStorage.setItem(task_id,JSON.stringify(updatedTaskObj));

					editLabel.html(editTask);

					$("[id*='"+task_id+"']").each(function (i, el) {
						$(this).find('label').text(editTask);
					});




					parent.removeClass('editMode');
				}
			});
			
			


		}



		


			//remove edit class
			//parent.removeClass('editMode');


		});
	//END EDIT TASK



	//COMPLETE TASK
	$('ul').on('click','.complete', function(){

		if($(this).siblings('label').attr('class')=='completed'){
			alert('The task is already completed!');

		}else{

			var this_element=$(this).parent();

			var task_id=$(this).parent().attr('id');

			var existing_object=localStorage.getItem(task_id);

			var parsed_obj=JSON.parse(existing_object);

			var task_name=parsed_obj.name;

			var is_active=parsed_obj.active;

			var is_completed=parsed_obj.completed;

			var is_favorited=parsed_obj.favorited;

			var updatedTaskObj=new todoTask(task_name,false,true,is_favorited);

			//var updated_value = { 'name':  task_name, 'active': false, 'completed': true,'favorited':is_favorited };

			localStorage.setItem(task_id,JSON.stringify(updatedTaskObj));

			$(this).siblings('label').addClass('completed');

			var task_from_all=$('#all #'+task_id+' label');

			if(!task_from_all.hasClass('completed')){

				task_from_all.addClass('completed');	
			}

			$('#incomplete-tasks #'+task_id).remove();
			$('#completed-tasks').append(this_element.clone());

			$("[id*='"+task_id+"']").each(function (i, el) {
				$(this).find('.complete').addClass('red');
				
			});

			countTask('#counter-all','#all');
			countTask('#counter-active','#incomplete-tasks');
			countTask('#counter-completed','#completed-tasks');
			countTask('#counter-favorite','#favorite-tasks');

		}

		
	});
	//END COMPLETE TASK
	


	//FAVORITE TASK
	$('ul').on('click','.favorite', function(){

		if($(this).siblings('label').hasClass('favorited')){
			alert('The task is already favorited!');

		}else{

			var this_element=$(this).parent();

			var task_id=$(this).parent().attr('id');

			var existing_object=localStorage.getItem(task_id);

			var parsed_obj=JSON.parse(existing_object);

			var task_name=parsed_obj.name;

			var is_active=parsed_obj.active;

			var is_completed=parsed_obj.completed;

			var is_favorited=parsed_obj.favorited;

			var updatedTaskObj=new todoTask(task_name,is_active,is_completed,true);

			//var updated_value = { 'name':  task_name, 'active': is_active, 'completed': is_completed,'favorited':true };

			localStorage.setItem(task_id,JSON.stringify(updatedTaskObj));

			$(this).siblings('label').addClass('favorited');

			var task_from_all=$('#all #'+task_id+' label');

			if(!task_from_all.hasClass('favorited')){

				task_from_all.addClass('favorited');	
			}

			

			$('#favorite-tasks').append(this_element.clone());

			$("[id*='"+task_id+"']").each(function (i, el) {
				$(this).find('.favorite span').removeClass();
				$(this).find('.favorite span').addClass('glyphicon glyphicon-star');
			});


			countTask('#counter-all','#all');
			countTask('#counter-active','#incomplete-tasks');
			countTask('#counter-completed','#completed-tasks');
			countTask('#counter-favorite','#favorite-tasks');

		}

		
	});
	//END FAVORITE TASK

	
	//DELETE TASK
	$('ul').on('click','.delete',function(){
		var task_name=$(this).parent().attr('id');
		localStorage.removeItem(task_name);

		$(this).parent().remove();


		if ($('#all').has($(this).length)) {
			$("[id*='"+task_name+"']").each(function (i, el) {
				el.remove();
			});
		}
		

		

		countTask('#counter-all','#all');
		countTask('#counter-active','#incomplete-tasks');
		countTask('#counter-completed','#completed-tasks');
		countTask('#counter-favorite','#favorite-tasks');
	});
	//END DELETE TASK





	//TASK COUNTER
	function countTask(counter_selector,list_parent){
		var remainTask = $(list_parent + ' li').length;
		$(counter_selector).hide().fadeIn(300).html(remainTask);
	};
	//END TASK COUNTER


	//CALL FUNCTION ON DOCUMENT READY
	countTask('#counter-all','#all');
	countTask('#counter-active','#incomplete-tasks');
	countTask('#counter-completed','#completed-tasks');
	countTask('#counter-favorite','#favorite-tasks');



	//REMOVE ALL
	$('#all-buttons').on('click','#remove-all',function(){

		$('#all').empty();
		$('#incomplete-tasks').empty();
		$('#completed-tasks').empty();
		$('#favorite-tasks').empty();

		localStorage.clear();

		countTask('#counter-all','#all');
		countTask('#counter-active','#incomplete-tasks');
		countTask('#counter-completed','#completed-tasks');
		countTask('#counter-favorite','#favorite-tasks');


	});
	//END REMOVE ALL

	//REMOVE SELECTED
	$('#all-buttons').on('click','#remove-selected',function(){

		$('#all input[type="checkbox"]').each(function (i, el) {

			if($(this).is(':checked')){

				var task_id=$(this).parent().attr('id');
				$(this).parent().remove();

				$("[id*='"+task_id+"']").each(function (i, el) {
					el.remove();
				});

				localStorage.removeItem(task_id);

			}

		});	

		countTask('#counter-all','#all');
		countTask('#counter-active','#incomplete-tasks');
		countTask('#counter-completed','#completed-tasks');
		countTask('#counter-favorite','#favorite-tasks');


	});
	//END REMOVE SELECTED


});//END DOM READY