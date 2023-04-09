"use strict";
       
$(document).ready(() => {

    $("input[type='checkbox']").click( () => {
        

        if ($(":checkbox:checked").length == 0){
            console.log($(":checkbox:checked"))
            $("#net").next().text("*")
        }else if($(":checkbox:checked").length >= 1){
            $("#net").next().text("")
        }
        //console.log($("input[type='checkbox']"))
        //console.log($(":checkbox:checked"))
    })

    $("#join_list").click( (evt) =>{
        

        let isValid = true
        const emailPattern =                        // key to focus on
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        const stringPattern = 
            /[A-Za-z]/
        const numberPattern = /\b[0-9]{5}\b/
        
        const email1 = $("#email_1").val().trim()
        const firstName = $("#first_name").val().trim()
        const lastName = $("#last_name").val().trim()
        const zipcode = $("#zip_code").val().trim()
        const state = $("#state").val().trim()
        const errMsg = $("#email_1").next().val().trim()

     
        if($("#email_1").val() == ""){
            $("#email_1").next().text("Invalid entry")
            isValid = false

        }else if ( !emailPattern.test(email1) ){     // key to focus on
            $("#email_1").next().text("Invalid format")
            isValid = false
            console.log("email")

        }else if( $("#email_2").val() != $("#email_1").val() ){
            $("#email_2").next().text("Does not match")
            isValid = false
            
        }else if( $("#email_2").val() == ""){
            $("#email_2").next().text("Invalid entry")
            isValid = false

        }else if ($("#first_name").val() == "") {
            $("#first_name").next().text("Invalid entry")
            isValid = false
        }
        else if ( !stringPattern.test(firstName) ){
            $("#first_name").next().text("Invalid format")
            isValid = false

        }else if ($("#last_name").val() == ""){
            $("#last_name").next().text("Invalid entry")
            isValid = false

        }else if ( !stringPattern.test(lastName) ){
            $("#last_name").next().text("Invalid format")
            isValid = false

        }else if ($("#state").val() == ""){
            $("#state").next().text("Invalid entry")
            isValid = false

        }else if ( !stringPattern.test(state) ){
            $("#state").next().text("Invalid format")
            isValid = false
        
        }else if ($("#zip_code") == ""){
            $("#zip_code").next().text("Invalid entry")
            isValid = false
        
        }else if ( !numberPattern.test(zipcode) ) {
            $("#zip_code").next().text("Invalid format")
            isValid = false
        }

        let array = []
        array = $(":checkbox:checked")

        if (array.length == 0){
            isValid = false
            $("#net").next().text("Please select")
        }
        if (isValid == false){
            evt.preventDefault()
        }

        
       
    })
$("#reset").click( () => {
    $("#email_1").next().text("")
    $("#email_2").next().text("")
    $("#first_name").next().text("*")
    $("#last_name").next().text("*")
    $("#state").next().text("*")
    $("#zip_code").next().text("*")

    
})



})

// const checkBoxArray = [] email2 = "" || !(emailPattern)
// checkBoxArray = $(":checkbox:checked")    // ":checkbox" is grabbing the root element of checkbox, then ":checked is grabbing if its checked or not"//