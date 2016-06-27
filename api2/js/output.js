/**
* @author   Juan Carlos Saavedra <@jc_suscriptor>
*/

var campusoft = campusoft || {};
if (!campusoft.game) campusoft.game = {};
if (!campusoft.game.default) campusoft.game.default = {};


campusoft.game.Output = function () {

	//Child iframe that will run the code.
	this.iframe;
	this.frameSource;
	this.frameOrigin;
	this.code;

	// Remove the old iframe and create a new one.
	var reset = function ()   // Only visible inside Restaurant()
    {
		console.debug('reset');
		var body = document.querySelector('body')
        if (this.iframe) body.removeChild(iframe);
		this.iframe = document.createElement('iframe');
		this.iframe.setAttribute('width', '600px');
		this.iframe.setAttribute('height', '800px');
		this.iframe.setAttribute('frameBorder', '0');
		body.appendChild(iframe);
    }

	// Create an iframe and load html into it. Post back with a `load` event
	// when the iframe has loaded.
	var _loadJavascript = function () {
		console.debug('_loadJavascript');

		try {
			var body =  this.iframe.contentWindow.document.querySelector('body');

 			this.blockJavacript = this.iframe.contentWindow.document.createElement('script');
			this.blockJavacript.setAttribute('type', 'text/javascript');
			this.blockJavacript.innerHTML = this.code;

			//document.getElementsByTagName('head').item(0).appendChild(blockJavacript);
			body.appendChild(this.blockJavacript);

			return true;  

		} catch (error) {

			if (error.name)
				console.error(error.name);
			if (error.message)
				console.error(error.message);
		}
		return false;
	}

   // Send a message back to the parent frame
	var  postParent  = function (type, data) {
		console.debug('postParent');

		var msg = JSON.stringify({
			data   : data
			, type   : type 
		});

		// If there is no frameSource (e.g. we're not embedded in another page)
        // Then we don't need to care about sending the messages anywhere!
        if (this.frameSource) {
            this.frameSource.postMessage(msg,this.frameOrigin);
        }
	}

    //TODO: Ver como manejerar los path relativos... 
	var template = '<html> <head> <script type="text/javascript" src="../../api2/js/phaser.2.4.4.js"></script> <script type="text/javascript" src="../../api2/js/util.js"></script> <script type="text/javascript" src="../../api2/js/images.js"></script> <script type="text/javascript" src="../../api2/js/sounds.js"></script> <script type="text/javascript" src="../../api2/js/colors.js"></script> <script type="text/javascript" src="../../api2/js/background.js"></script><script type="text/javascript" src="../../api2/js/api2.js"></script> </head> </html>';



	var load = function (code) {
		console.debug('load');

		this.code = code;

		reset();

		var html = template; //.replace("@code", code);
		console.log(html);

		iframe.addEventListener('load', function () {
			console.debug('iframe.load');
			var _result = _loadJavascript();
			postParent('load', null);
		}, false);

		var doc = this.iframe.contentWindow.document;
		doc.open();
		//disableFunctions(doc)

		var docWriteChecks = 0;
		var docWriteCheckInterval = setInterval(function () {
			if (doc.querySelector('body')) {
				//handleAnchorTags(doc);
				clearInterval(docWriteCheckInterval);
			} else if (docWriteChecks > 20) {
				clearInterval(docWriteCheckInterval);
			}
			docWriteChecks++;
		}, 500);

		doc.write(html);
		doc.close();
	}

	this.handleMessage = function (event) {
		
		console.debug('handleMessage');

		//TODO: Mejorar 
		frameSource = event.source;
		frameOrigin = event.origin;

		var msg;
		try {
			msg = JSON.parse(event.data);
		} catch (err) {

			// We are only concerned in JSON messages.
			return;
		}

		var type = msg.type
			, data = msg.data;
 
 		//TODO: Segun el tipo ejecutar la function/action
		//Load
		load(data);

	}
}



// Handle messages coming in from the parent frame
var output = new campusoft.game.Output();

if (window.addEventListener) {
	window.addEventListener('message', output.handleMessage, false);
} else if (window.attachEvent) { // ie8
	window.attachEvent('onmessage', output.handleMessage);
}