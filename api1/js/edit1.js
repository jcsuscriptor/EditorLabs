
function byId(e){return document.getElementById(e);}

function simple() {
    var rawInput = byId('source').value;
   
    // get reference to window inside the iframe
	var wn = byId('frame').contentWindow;
	 
	// postMessage arguments: data to send, target origin
	wn.postMessage(rawInput, 'http://localhost:1010/');

}

function reload() {
    var rawInput = byId('source').value;
   
    // get reference to window inside the iframe
	var wn = byId('frame').contentWindow;
	//wn.src = wn.src
	wn.location.reload();

	
	// postMessage arguments: data to send, target origin
	wn.postMessage(rawInput, 'http://localhost:1010/');

}