$(document).ready(function(){





    /**
     * Handlebar helper function for if condition
     * @param  {String} a     [first comparable parameter]
     * @param  {String} b     [first comparable parameter]
     * @param  {String} opts) [data when condition is true]
     * @return {String}       [data]
     */
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });




    var todo = new ToDoTask();


	todo.showTasks();



	/**
	 * [Add button click event handler,if the task value is not empty add new task to localStorage and send new task data to Handlebar for appending.Show success and failure message if new task value is empty or not.]

	 */
	$('button#add').on('click',function(){
		
		var new_task = $('#new-task').val();



		
		if(new_task!=='') {

			var index=todo.addTask(new_task);
			
			var data = { 

				key:"task-"+index,
				task_name:new_task,
				completed:'',
				favorite_status:'glyphicon-star-empty',
				complete_status:''
			};

			var template_add_new=todo.getTemplateAddNew();

			$('ul#all').append(template_add_new(data));
			$('ul#incomplete-tasks').append(template_add_new(data));
			$('.inputTask').val(new_task);

			$('.success').html('<i class="fa fa-check"></i>Task added to list').fadeIn('slow').delay(500).fadeOut();
			
			$('.warning').hide();


			$('#new-task').val('');

			todo.countTasks();
			
			
		}else{

			$('.warning').html('<i class="fa fa-warning"></i> No task added').show();
			
			$('.success').hide();
			

			
		}

		
		
		



	});
	
	

	/**
	 * [Edit button click event handler,if it doesnt have class editMode on every ENTER key press update the value and localStorage,on end remove editMode class]
	 
	 */
	$('ul').on('click', '.edit',function(){


		
		var parent = $(this).parent();

		var this_element=$(this);

		var task_id=parent.attr('id');

		


		
		if(!parent.hasClass('editMode')){

			parent.addClass('editMode');

			
			
			$('.inputTask').keyup(function(e) {
				if(e.keyCode == 13)
				{
					var edited_task =this_element.prev('input[type="text"]').val();
					var edited_label = parent.find('label');
					var edited_label_value = parent.find('label').text();


					todo.editTask(edited_label_value,edited_task)

					edited_label.html(edited_task);

					$("[id*='"+task_id+"']").each(function (i, el) {
						$(this).find('label').text(edited_task);
					});




					parent.removeClass('editMode');
				}
			});

			

		}else{

			
			
			
			parent.removeClass('editMode');

		}



	});
	



	/**
	 * [Complete button event handler,if sibling label has completed class deny usage of the button,if not call completeTask function and update the completed value with it.Change all other elements with the same id.Remove active element changed to completed.]
	
	 */
	$('ul').on('click','.complete', function(){

		if($(this).siblings('label').attr('class')=='completed'){
			alert('The task is already completed!');
			return false;
		}

		var this_element=$(this).parent();

		var task_id=$(this).parent().attr('id');

		var name=$(this).siblings('label').text();

		todo.completeTask(name);

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

		todo.countTasks();
	
	});
	
	


	/**
	 * [Favorite button event handler,if it has class favorited deny usage of the button.If not call favoriteTask function and update the favorited value with it.Change all other elements with the same id.]

	 */
	$('ul').on('click','.favorite', function(){

		if($(this).siblings('label').hasClass('favorited')){
			alert('The task is already favorited!');

		}

			var this_element=$(this).parent();

			var task_id=$(this).parent().attr('id');

			var name=$(this).siblings('label').text();

			todo.favoriteTask(name);

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


			todo.countTasks();
		

		
	});
	

	
	/**
	 * [Delete button event handler,on click call removeTask() function and remove every element with the same id]
	
	 */
	$('ul').on('click','.delete',function(){

		var task_id=$(this).parent().attr('id');
		var name=$(this).siblings('label').text();

		todo.removeTask(name);


		if ($('#all').has($(this).length)) {
			$("[id*='"+task_id+"']").each(function (i, el) {
				el.remove();
			});
		}

		todo.countTasks();
	});
	



	/**
	 * [All button event handler,on click remove all elements from dom and localStorage]

	 */
	$('#all-buttons').on('click','#remove-all',function(){


		todo.removeAllTasks();

		$('#all').empty();
		$('#incomplete-tasks').empty();
		$('#completed-tasks').empty();
		$('#favorite-tasks').empty();

		todo.countTasks();


	});
	

	/**
	 * [Remove selected event handler,on click remove all elements from dom and localStorage with checked attribute]
	
	 */
	$('#all-buttons').on('click','#remove-selected',function(){

		$('#all input[type="checkbox"]').each(function (i, el) {

			if($(this).is(':checked')){

				var task_id=$(this).parent().attr('id');
				var name=$(this).siblings('label').text();

				todo.removeTask(name);
				$("[id*='"+task_id+"']").each(function (i, el) {
					el.remove();
				});

				

			}

		});

		todo.countTasks();


	});
	
	
});