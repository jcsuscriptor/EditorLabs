/**
* @author   Juan Carlos Saavedra <@jc_suscriptor>
*/

var campusoft = campusoft || {};
if (!campusoft.game) campusoft.game = {};
if (!campusoft.game.default) campusoft.game.default = {};


campusoft.game.Edit = function (iframeOutput) {
	this.iframeOutput = iframeOutput;

	this.frameSource;
	this.frameOrigin;

	var post = function (type, data) {
		console.debug('post');

		var msg = JSON.stringify({
			data: data
			, type: type
		});

		var post = (iframeOutput.contentWindow) ? iframeOutput.contentWindow :
			(iframeOutput.contentDocument.document) ? iframeOutput.contentDocument.document : iframeOutput.contentDocument;


		// If there is no frameSource (e.g. we're not embedded in another page)
        // Then we don't need to care about sending the messages anywhere!
        if (post) {
			//TODO: ....
			// Send the data to the frame using postMessage
			post.postMessage(msg, '*');
        }
	}


	this.init = function () {
		//handleMessage
		if (window.addEventListener) {
			window.addEventListener('message', this.handleMessage, false);
		} else if (window.attachEvent) { // ie8
			window.attachEvent('onmessage', this.handleMessage);
		}
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

        //TODO: Action respuesta
		//1. Quitar mask, load output ok
		//2. Show error,warning output.. 
		console.debug(msg);
		var type = msg.type;
		if (type == 'load') {
			var data = msg.data;
			if (data != null && data.errors != undefined && (Array.isArray(data.errors)) && data.errors.length>0) {
				//TODO: Presentar errores  >> (Siguiente, Anterior)
				bootbox.alert(data.errors[0].text, function () {
					console.log('callback.show.erros');
				});
			}
		}
	}

    this.runCode = function (code) {
		//TODO: Establecer mask... 

		post('load', code);
    }
}
