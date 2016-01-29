/**
 * Created by Nemanja on 1/29/2016.
 */


/**
 * TodoTask object
 * @param  {String} storage_name      [name for to do task]
 * @param  {Boolean} storage_active    [boolean value if task is active]
 * @param  {Boolean} storage_completed [boolean value if task is completed]
 * @param  {Boolean} storage_favorited [boolean value if task is favorited]
 * @return {}                   [returns all object variables]
 */
function ToDoTask(storage_name,storage_active,storage_completed,storage_favorited){

    this.name=storage_name;
    this.active=storage_active;
    this.completed=storage_completed;
    this.favorited=storage_favorited;





};


/**
 *
 * ToDo Class
 */
ToDoTask.prototype = {

    /**
     * Constructor for ToDoTask object
     */
    constructor:ToDoTask,
    /**
     * Get handlebar template for all tasks
     */
    getTemplateAll:function(){

        this.source_all=$('#template-all').html();
        return Handlebars.compile(this.source_all);
    },
    /**
     * Get handlebar template for active tasks
     */
    getTemplateActive:function(){

        this.source_active=$('#template-active').html();
        return Handlebars.compile(this.source_active);

    },
    /**
     * Get handlebar template for completed tasks
     */
    getTemplateCompleted:function(){

        this.source_completed=$('#template-completed').html();
        return Handlebars.compile(this.source_completed);

    },
    /**
     * Get handlebar template for favorited tasks
     */
    getTemplateFavorited:function(){

        this.source_favorited=$('#template-favorited').html();
        return Handlebars.compile(this.source_favorited);
    },
    /**
     * Get all handlebar templates
     */
    getTemplates:function(){
        this.template_all=this.getTemplateAll();
        this.template_active=this.getTemplateActive();
        this.template_completed=this.getTemplateCompleted();
        this.template_favorited=this.getTemplateFavorited();


    },
    /**
     * Get handlebar template for add new tasks
     */
    getTemplateAddNew:function(){
        this.source_add_new=$('#template-add-new').html();
        return Handlebars.compile(this.source_add_new);
    },
    /**
     * Set new item in the localStorage
     */
    setAllTasks:function(all_tasks){
        localStorage.setItem('all_tasks',JSON.stringify(all_tasks));
    },
    /**
     * Get all tasks from localStorage
     */
    getAllTasks:function(){

        return JSON.parse(localStorage.getItem('all_tasks'));
    },
    /**
     * [checkIfExists function for checking if array exists]
     * @param  {String} key [value for localStorage key]
     * @return {Boolean}     [return true if localStorage exists]
     */
    checkIfExists: function(key) {
        var result=false;
        if(localStorage.getItem(key)===null){

            result=false;
        }else{


            result=true;
        }

        return result;
    },

    /**
     * [addTask function for adding new to do task to array and localStorage]
     * @param {String} task_name [name of the task to be entered]
     * @return {Boolean}     [returns index of entered task]
     */
    addTask:function(task_name){

        if(this.checkIfExists('all_tasks')){

            var newTask=new ToDoTask(task_name,true,false,false);
            var all_tasks=this.getAllTasks();
            console.log(all_tasks);
            var index=all_tasks.push(newTask)-1;


            this.setAllTasks(all_tasks);

        }else{

            var newTask=new ToDoTask(task_name,true,false,false);
            var all_tasks=new Array();
            var index=all_tasks.push(newTask)-1;
            console.log(all_tasks);

            this.setAllTasks(all_tasks);





        }


        return index;
    },

    /**
     * [editTask function for updating tasks name]
     * @param  {String} current_name  [current name of the task]
     * @param  {String} new_task_name [new task name]
     * @return {Boolean}               [return true if task is updated]
     */
    editTask:function(current_name,new_task_name){
        var result=false;
        var all_tasks=this.getAllTasks();
        for(var i=0;i<all_tasks.length;i++){

            if(all_tasks[i].name==current_name){


                all_tasks[i].name=new_task_name;

                this.setAllTasks(all_tasks);

                result=true;

            }else{

                result=false;
            }


        }
        return result;


    },

    /**
     * [completeTask function for completing task,changing its value completed to true]
     * @param  {String} task_name [name of the task that is to be completed]
     * @return {Boolean}           [returns true if task is completed]
     */
    completeTask:function(task_name){

        var result=false;

        var all_tasks=this.getAllTasks();
        for(var i=0;i<all_tasks.length;i++){
            if(all_tasks[i].name==task_name){

                all_tasks[i].completed=true;
                all_tasks[i].active=false;
                this.setAllTasks(all_tasks);

                result=true;

            }else{

                result=false;
            }


        }
        return result;


    },

    /**
     * [favoriteTask function for favoriting task,changing its value favorited to true]
     * @param  {String} task_name [name of the task to be favorited]
     * @return {Boolean}           [return true if task is favorited]
     */
    favoriteTask:function(task_name){

        var result=false;
        var all_tasks=this.getAllTasks();
        for(var i=0;i<all_tasks.length;i++){
            if(all_tasks[i].name==task_name){

                all_tasks[i].favorited=true;
                this.setAllTasks(all_tasks);

                result=true;

            }else{

                result=false;
            }


        }
        return result;


    },

    /**
     * [removeTask function for removing task from localStorage and array]
     * @param  {String} task_name [name of the task to be removed]
     * @return {Boolean}           [return true if task is removed]
     */
    removeTask:function(task_name){
        var result=false;
        var all_tasks=this.getAllTasks();
        for(var i=0;i<all_tasks.length;i++){
            if(all_tasks[i].name==task_name){

                all_tasks.splice(i,1);
                this.setAllTasks(all_tasks);

                result=true;

            }else{

                result=false;
            }


        }
        return result;

    },

    /**
     * [removeAllTasks function for removing all tasks from localStorage and array]
     */
    removeAllTasks:function(){
        var all_tasks=this.getAllTasks();
        all_tasks.length=0;
        this.setAllTasks(all_tasks);
    },

    /**
     * [countTasks function for counting and updating the tasks number in each category]
     */
    countTasks:function(){


        var all_tasks_number = $('#all' + ' li').length;
        $('#counter-all').hide().fadeIn(300).html(all_tasks_number);

        var active_tasks_number = $('#incomplete-tasks' + ' li').length;
        $('#counter-active').hide().fadeIn(300).html(active_tasks_number);

        var completed_tasks_number = $('#completed-tasks' + ' li').length;
        $('#counter-completed').hide().fadeIn(300).html(completed_tasks_number);

        var favorite_tasks_number = $('#favorite-tasks' + ' li').length;
        $('#counter-favorite').hide().fadeIn(300).html(favorite_tasks_number);


    },

    /**
     * [showTasks function for showing tasks,pulling from localStorage and sending to Handlebar for processing]
     */
    showTasks:function(){


        if(this.checkIfExists('all_tasks')){
            var all_tasks=this.getAllTasks();

            this.getTemplates();

            $('#all').append(this.template_all(all_tasks));
            $('#incomplete-tasks').append(this.template_active(all_tasks));
            $('#favorite-tasks').append(this.template_favorited(all_tasks));
            $('#completed-tasks').append(this.template_completed(all_tasks));
            this.countTasks();

        }

    }







};

