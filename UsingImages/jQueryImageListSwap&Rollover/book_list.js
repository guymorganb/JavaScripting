"use strict";

/*$(document).ready( () => {
    $("#categories h2").click( (evt) => {
        const h2 = evt.currentTarget

        $(h2).toggleClass("minus");

        if ($(h2).attr("class") !== "minus"){
            $(h2).next().hide();
            $("#image").attr("src","");
        }else{
            $(h2).next().show()
        }
        evt.preventDefault()
    
        $("#categories").find("a:first").focus();
    });

    $("#categories a").each( (index, a) => {
        const image = new Image();
        image.src = a.href

        $("#categories a").click( (evt) => {
            const a = evt.currentTarget

            $("img").attr("src", a.href)
            
            evt.preventDefault()
        })

        
    })
})*/

/*$(document).ready( () => {
    
    $("#categories h2").click ( (evt) => {
        const h2 = evt.currentTarget

        $(h2).toggleClass("minus");

        if($(h2).attr("class") !== "minus"){
            $(h2).next().hide();
            $("img").attr("src", "")
        }else{
            $(h2).next().show();
        }
        evt.preventDefault();

        $("#categories").find("a:first").focus()
    });

    $("#categories a").each((index, a) => {
        const image = new Image()
        image.src = a.href

        $("#categories a").click( (evt) => {
            const a = evt.currentTarget
        

            $("img").attr("src", a.href)

            evt.preventDefault();
        })
    })
    
    
});*/

// Make the picture appear when hovered over usin jQuery

$(document).ready( () => {

    $("#categories h2").click( (evt) => {
        const h2 = evt.currentTarget

        $(h2).toggleClass("minus");
        if($(h2).attr("class") == "minus"){
            $(h2).next().show()
        }else{
            $(h2).next().hide()
            $("#image").attr("src", "")     // make the image "src" attribute empty so the image goes away when the tab is closed
        }

        evt.preventDefault()
    })
    
    $("#categories a").each( (index, a) => {
        const image = new Image()       // preload the images of it wont work
        image.src = a.href              // must include .src and .href or it wont work

        $("#categories a").mouseover( (evt) => {    // you have to pass the event object because it will allow you to assign the image object through it
            const a = evt.currentTarget

            $("img").attr("src", a.href) // telling it to add the "src" attribute with "a.href" which is assigned to the preloaded image object

            evt.preventDefault()
        })
    })
})
