 
var myElement = document.getElementById("ElementoAsociarEvento");



myElement.addEventListener("userLogin", function(e) {
    console.debug("Event is: ", e);
    console.debug("Custom data is: ", e.detail);
});

// First create the event
var myEvent = new CustomEvent("userLogin", {
    detail: {
        username: "davidwalsh"
    }
});

// Trigger it!
myElement.dispatchEvent(myEvent);
 