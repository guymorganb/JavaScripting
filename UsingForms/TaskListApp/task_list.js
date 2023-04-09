"use strict";

$(document).ready( () => {
    // Set variables to check for expiration date by grabbing data in local storage
    try {
        let expDate = new Date(Date.parse(localStorage.expiration))
        let today = new Date()
        let currentTime = today.getTime()
        let expTime = expDate.getTime()
        // Check if expiration date has elapsed & clear if true
        if ((expTime - currentTime) <= 0){
            const msg = () => {
                return confirm("One or more of your task has expired, Remove task?")
            }
            const result = msg()
                if(result){
                    localStorage.removeItem("expiration")
                    localStorage.removeItem("E14tasks")
                    $("#task_list").val("");
                    $("#task").focus();
                     //console.log(expDate)
                    console.log(expTime)
                    //console.log(today)
                    console.log(currentTime)
                }
                else{
                    localStorage.E14tasks = localStorage.E14tasks.concat(`^expired ${localStorage.expiration}^`, "\n")
                    $("#task_list").val(localStorage.E14tasks);
                    $("#task").focus();
                }
        }
    }
    catch(error){
    console.log(error.name + ": " + error.message)
    }
    $("#add_task").click( () => {   
        const textbox = $("#task");
        const task = textbox.val();
        if (task === "") {
            alert("Please enter a task.");
            textbox.focus();
        } else {
            // add task to web storage 
            let tasks = localStorage.E14tasks || "";  // "" is default
            localStorage.E14tasks = tasks.concat(task, "\n");
            // sets a date 21 days from the current date
            const day21 = new Date()            
            day21.setDate( day21.getDate() + 21 ) 
            // set with property named "expiration"
            localStorage.expiration = day21.toDateString()  
            // clear task text box and re-display tasks
            textbox.val("");
            $("#task_list").val(localStorage.E14tasks);
            textbox.focus();
        }
    });
    $("#clear_tasks").click( () => {
        localStorage.removeItem("E14tasks");
        localStorage.removeItem("expiration");      // removes the item with "expiration" property, which you arbitrarily set above.
        $("#task_list").val("");
        $("#task").focus();
    }); 
    // display tasks on initial load
    $("#task_list").val(localStorage.E14tasks);
    $("#task").focus();  
});