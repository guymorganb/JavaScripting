"use strict";

const isDate = (date, datePattern) => {
    if (!datePattern.test(date)) { return false; }

    const dateParts = date.split("/");
    const month = parseInt( dateParts[0] );
    const day = parseInt( dateParts[1] );

    if ( month < 1 || month > 12 ) { return false; }
    if ( day > 31 ) { return false; }
    return true;
};
const validateExp = (expDate, expPattern)=>{       // to test for a valid input range for Credit card date the input must be broken down and tested
   
    if (!expPattern.test(expDate)){
        return false
    }
    const dateArray = expDate.split("/")
    const monthItem = parseInt(dateArray[0])
    

    if(  monthItem < 1 || monthItem > 12  ){
        return false
    }
    
    return true
}

// make an alternate function that validates both expiration date and date of birth at the same time

const isDateAlternate = (date, datePattern, type) => {
    if (!datePattern.test(date)) { return false; }

    if (type == "full") {
        const dateParts = date.split("/");
        const month = parseInt( dateParts[0] );
        const day = parseInt( dateParts[1] );

        if ( month < 1 || month > 12 ) { return false; }
        if ( day > 31 ) { return false; }
        return true;
    }
    if (type == "cc") {
        const index = date.indexOf( "/" );  // returns the position of "/"
        console.log(index)
        const month = parseInt( date.substring( 0, index ) );  // makes a substring from index 0 up to the "index" variable
        console.log(month)
        if ( month < 1 || month > 12 ) { return false; }
        return true;
    } 
};

$( document ).ready( () => {

    $( "#save" ).click( () => {
        $("span").text("");   // clear any previous error messages
        
        // get values entered by user
        const email = $("#email").val();
        const phone = $("#phone").val();
        const zip = $("#zip").val();
        const dob = $("#dob").val();
        const cc = $("#card").val();
        const expDate = $("#cc_date").val()

        // regular expressions for validity testing
        const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        const zipPattern = /^\d{5}(-\d{4})?$/;
        const datePattern = /^[01]?\d\/[0-3]\d\/\d{4}$/;
        const ccPattern = /^\d{12}(-\d{4})$/;
        const expPattern = /^[01]?\d\/\d{4}$/
        const nonDigits = /\D/ 

        // check user entries for validity

        let isValid = true;
        if ( email === "" || !emailPattern.test(email) ) {
            isValid = false;
            $("#email").next().text("Please enter a valid email.");
        }
        if ( phone === "" || !phonePattern.test(phone) ) {
            isValid = false;
            $("#phone").next().text("Please enter a phone number in NNN-NNN-NNNN format.");
        }
        if ( zip === "" || !zipPattern.test(zip) ) {
            isValid = false;
            $("#zip").next().text("Please enter a valid zip code.");
        }
        if ( dob === "" || !isDateAlternate(dob, datePattern, "full") ) {           // from the book
            isValid = false;
            $("#dob").next().text("Please enter a valid date in MM/DD/YYYY format.");
            
        }
        if (cc == "" || !ccPattern.test(cc) || !nonDigits.test(cc)){
            isValid = false
            $("#card").next().text("Please enter CC# in NNNNNNNNNNNN-NNNN format.")
        }
        /*if (expDate == "" || !validateExp(expDate, expPattern)){            // this is the one I made
            isValid = false
            $("#cc_date").next().text("Please enter a valid date in MM/YYYY format.");

        }*/
        if (expDate == "" || !isDateAlternate(expDate, expPattern, "cc")){        //this is from the book
            isValid = false
            $("#cc_date").next().text("Please enter a valid date in MM/YYYY format.");
        }
       
        
        if ( isValid ) { 
            // code that saves profile info goes here
        }
        
        $("#email").focus(); 
    });
    
    // set focus on initial load
    $("#email").focus();
});