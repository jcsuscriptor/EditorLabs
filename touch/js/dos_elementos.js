window.addEventListener('load', function() { 
    var myElement = document.getElementById('myElement');
	var otherElement = document.getElementById('otherElement');

	// create a simple instance
	// by default, it only adds horizontal recognizers
	var mc = new Hammer(myElement);
	
	var other = new Hammer(otherElement);
	
	// listen to events...
	mc.on("swipeleft swiperight tap press", function(ev) {
		myElement.textContent = ev.type +" gesture detected.";
	});
	
	other.on("swipeleft swiperight tap press", function(ev) {
		otherElement.textContent = ev.type +" gesture detected.";
	});
	
	 

}, false);



