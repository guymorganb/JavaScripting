"use strict";

$(document).ready( () => {

    const scores = [];
    let target = 0
    const calculate = (score) => {
        $("#add_score").next().text("");  
        // $("#message").text("");  // remove any previous error message
        // add score to scores array 
        scores.push(score);
        // display all scores
        $("#all").text(scores.join(", ")); // .join() method converts all elements of the array to strings separated by the specified separator
        // display average score
        const total = scores.reduce( (tot, val) => tot + val, 0 );  // .reduce() method takes a function that processes all array values in ascending order and reduces them to just one value, the optional second charecter is the staring value 
        const avg = total/scores.length;                            // takes the total from the reduced scores array and divides it by the length of the scores array to get the average score
        $("#avg").text(avg.toFixed(2));
    }
    const flipScores = () => {
         // display last 3 scores
         const len = scores.length;
         const copy = (len <= 3) ? scores.slice() : scores.slice(len - 3, len); // copy last three
         copy.reverse();
         $("#last").text(copy.join(", "));   //.join() method converts all elements of the array to strings separated by the specified separator
    }
    const delScores = (delIndex) => {
        // test for valid input
        if (delIndex > scores.length || delIndex < 0){
            $("#delete_score").next().text("Invlid index entry")
        }else{
            scores.splice(delIndex, 1)              // use .splice() method to remove the selected index taken from the delete score box, and remove 1 array item, this method returns the removed index's valuse so you have to be aware of that
            $("#all").text(scores.join(", "))       // update the text in the feild displaying the data and use .join() methos to reformat it as before 
        }      
    }
    const findValue = (array, index) => {           // find the value in an array at any index passed to it
        array.find( () => {
            target = array[index]
        })
    }
    const mapIt_Update_Delete = () => {
        let copy = Array.of($("#last").text())         // turn copy into an array from a string so you can manipulate it
        //console.log(Array.isArray(copy))               //Check if its an array object type shoul be true
        let copy1 = copy[0].split(",")                 // split copy up by commas
        let copy2 = copy1.map( (str) => {return parseInt(str)} );  // map the array so its an array of numbers
        let targetIndex = copy2.indexOf(target) 
        if (target >= 0){
            const total = scores.reduce( (tot, val) => tot + val, 0 );  // .reduce() method takes a function that processes all array values in ascending order and reduces them to just one value, the optional second charecter is the staring value
            const avg = total/scores.length;           // takes the total from the reduced scores array and divides it by the length of the scores array to get the average score
            $("#avg").text(avg.toFixed(2));            // update the average score
        }
        if(targetIndex > 0){
            const run = confirm(`Would you like to remove index: ${targetIndex}, from last 3 scores?`)
            if (run == true){
                copy2.splice(targetIndex, 1);                   // use splice method to remove the target.
                $("#last").text(copy2.join(", "))   
            }
        }                        
    }
    $("#add_score").click( () => {
        const score = parseFloat($("#score").val());
        $("#delete_score").next().text("")       
        if (isNaN(score) || score < 0 || score > 100) {
            $("#add_score").next().text("Score must be between 0 and 100."); 
             //$("#message").text("Score must be between 1 and 100.");
        }else {
            calculate(score)
            flipScores()
        }
        // get text box ready for next entry
        $("#score").val("");
        $("#score").focus(); 
    });

    $("#delete_score").click( () => {
        const delIndex = parseInt($("#index").val())  // get the input from the delete score box
        findValue(scores, delIndex)        
        delScores(delIndex)
        mapIt_Update_Delete()
        $("#last").text()
    }); 

    // set focus on initial load
    $("#score").focus();
});