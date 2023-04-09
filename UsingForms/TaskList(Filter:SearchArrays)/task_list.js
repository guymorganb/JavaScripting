"use strict";

const displayTaskList = tasks => {
    let taskString = "";
    if (tasks.length > 0) {
        // convert stored date string to Date object
        tasks = tasks.map( task => [task[0], new Date(task[1])] );

        tasks.sort( (task1, task2) => {   // sort by date
            const date1 = task1[1]; // get Date object from task1
            const date2 = task2[1]; // get Date object from task2
            if (date1 < date2) { return -1; }
            else if (date1 > date2) { return 1; }
            else { return 0; }
        });

        taskString = tasks.reduce( (prev, curr) => {
            return prev + curr[1].toDateString() + " - " + curr[0] + "\n";
        }, ""); // pass initial value for prev parameter
    }

    $("#task_list").val(taskString);
    $("#task").focus();
};

$(document).ready( () => {
    const taskString = localStorage.E15tasks;
    const tasks = (taskString) ? JSON.parse(taskString) : [];

    $("#add_task").click( () => {
        const task = $("#task").val();
        const dateString = $("#due_date").val();
        const dueDate = new Date(dateString);
        
        if (task && dateString && dueDate != "Invalid Date") {
            const newTask = [task, dateString];  // store dateString
            tasks.push(newTask);
            localStorage.E15tasks = JSON.stringify(tasks);

            $("#task").val("");
            $("#due_date").val("");
            displayTaskList(tasks);
        } else {
            alert("Please enter a task and valid due date.");
            $("#task").select();
        }
    });
    
    $("#clear_tasks").click( () => {
        tasks.length = 0;
        localStorage.removeItem("E15tasks");
        $("#task_list").val("");
        $("#task").focus();
    });   
    
    $("#filter").click( () => {
        let searchTerm = prompt("Enter text to search by, or leave blank to see all tasks")
        if (searchTerm == ""){
            displayTaskList(tasks)
        }else{
            searchTerm = searchTerm.toLowerCase();      // searchTerm = searchTerm.toLowerCase(); - This line converts the search term to lowercase letters, so that the search is case-insensitive.
            const searchTasks = current => {            // const searchTasks = current => { - This line defines a function called searchTasks that takes in an argument called current.
                const text = current[0].toLowerCase()   // const text = current[0].toLowerCase(); - This line creates a variable called text that contains the first item of the current array, which is a string representing the text of the task. This string is also converted to lowercase letters.
                const date = new Date(current[1]).toDateString().toLowerCase() // const date = new Date(current[1]).toDateString().toLowerCase(); - This line creates a variable called date that contains the second item of the current array, which is a date string representing the date the task was created. This string is converted to a Date object, which is then converted back to a string in a human-readable format using toDateString(). Finally, this string is converted to lowercase letters.
                return date.indexOf(searchTerm) > -1 || text.indexOf(searchTerm) > -1;
                //return date.indexOf(searchTerm) > -1 || text.indexOf(searchTerm) > -1; - This line returns a boolean value indicating whether the searchTerm is found in either the date or text variables. 
                //The indexOf() method is used to search for the searchTerm string within the date and text variables. If the search term is found, indexOf() returns the index of the first occurrence of the search term; otherwise, it returns -1. If the search term is found in either date or text, indexOf() will return a value greater than -1, 
                //and the function will return true. If the search term is not found in either date or text, indexOf() will return -1 for both, and the function will return false.
            };
            
            const filteredTasks = tasks.filter(searchTasks);
            //const filteredTasks = tasks.filter(searchTasks); - This line creates a new array called filteredTasks that contains only the tasks that match the search term. 
            //The filter() method is used to iterate over the tasks array and pass each task as an argument to the searchTasks function. 
            //If searchTasks returns true for a given task, that task will be included in the filteredTasks array.
            displayTaskList(filteredTasks);
            //displayTaskList(filteredTasks); - This line calls a function called displayTaskList and passes the filteredTasks array as an argument. 
            //The displayTaskList function displays the filtered tasks on the screen.
            
            //Overall, this code searches for tasks based on a given search term, filters the tasks that match the search term, and then displays the filtered tasks on the screen. 
            //The searchTasks function is used as a filter to determine which tasks match the search term.
        }

    });
    
    displayTaskList(tasks);
});