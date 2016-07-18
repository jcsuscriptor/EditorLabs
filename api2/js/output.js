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

		//TODO: Como estblecer que utilice todo el espacio del contenedor
		this.iframe.setAttribute('width', '600px');
		this.iframe.setAttribute('height', '600px');
		this.iframe.setAttribute('frameBorder', '0');
		this.iframe.setAttribute('scrolling', 'no');
		body.appendChild(iframe);
    }

	var wrapperTemplate = 'function __preload(game) {  var list = [@preload]; for (var index = 0; index < list.length; index++) {  var element = list[index];  var image = campusoft.game.asset.images["fillnotfound"];  if (campusoft.game.asset.images[element]) { image= campusoft.game.asset.images[element];  } game.load.image(element, getFullPath(image.src));  }  } try {  @code  } catch (error) {  console.log("error.tryCatchTemplate");  } ';

	var wrapperTemplateCode = 'try {  @code  } catch (error) {  console.log("error.tryCatchTemplate");  } ';

	var wrapperTemplatePreload = 'function __preload(game) {  var list = [@preload]; for (var index = 0; index < list.length; index++) {  var element = list[index];  var image = campusoft.game.asset.images["fillnotfound"];  if (campusoft.game.asset.images[element]) { image= campusoft.game.asset.images[element];  } game.load.image(element, getFullPath(image.src));  }  }';


	var _loadJavascriptPreload = function (preload) {
		console.debug('_loadJavascriptPreload');

		try {
			var body = this.iframe.contentWindow.document.querySelector('body');

			this.blockJavacript = this.iframe.contentWindow.document.createElement('script');
			this.blockJavacript.setAttribute('type', 'text/javascript');

			var codeSafe = wrapperTemplatePreload.replace("@preload", preload);
		 
			//TODO: Revisar como capturar errores en el code que append
			this.blockJavacript.innerHTML = codeSafe;

			this.blockJavacript.addEventListener('error', function (e) {
				console.log('_loadJavascriptPreload.error: '+ e);
			}, true);

			//document.getElementsByTagName('head').item(0).appendChild(blockJavacript);
			body.appendChild(this.blockJavacript);

			return true;

		} catch (error) {
			console.log('Existe errores:');
			if (error.name)
				console.error(error.name);
			if (error.message)
				console.error(error.message);
		}
		return false;
	}

	// Create an iframe and load html into it. Post back with a `load` event
	// when the iframe has loaded.
	//preload = 'name','name','name'
	var _loadJavascript = function () {
		console.debug('_loadJavascript');

		try {
			var body = this.iframe.contentWindow.document.querySelector('body');

			this.blockJavacript = this.iframe.contentWindow.document.createElement('script');
			this.blockJavacript.setAttribute('type', 'text/javascript');

			var codeSafe = wrapperTemplateCode.replace("@code", this.code);

			//TODO: Revisar como capturar errores en el code que append
			this.blockJavacript.innerHTML = codeSafe;

			this.blockJavacript.addEventListener('error', function (e) {
				console.log('_loadJavascript.error: '+ e);
			}, true);

			//document.getElementsByTagName('head').item(0).appendChild(blockJavacript);
			body.appendChild(this.blockJavacript);

			return true;

		} catch (error) {
			console.log('Existe errores:');
			if (error.name)
				console.error(error.name);
			if (error.message)
				console.error(error.message);
		}
		return false;
	}

	// Send a message back to the parent frame
	var postParent = function (type, data) {
		console.debug('postParent');

		var msg = JSON.stringify({
			data: data
			, type: type
		});

		// If there is no frameSource (e.g. we're not embedded in another page)
        // Then we don't need to care about sending the messages anywhere!
        if (this.frameSource) {
            this.frameSource.postMessage(msg, this.frameOrigin);
        }
	}

    //TODO: Ver como manejerar los path relativos... 
	//TODO: Mejorar el control de errores globales.. ()
	//exite dos iframe 1. output tiene el principal, el codigo se ejecuta en un interno.
	//se debe realizar un mecanismo para comunicar el iframe padre con el hijo... y
	//el iframe comunique a quien lo llamo... 
	var template = '<html> <head><style> body { margin: 0px; padding: 0px; } iframe{ border: none; margin: 0px; padding: 0px; } </style> <script type="text/javascript" src="../../api2/libs/phaser-2.4.4/phaser.2.4.4.js"></script> <script type="text/javascript" src="../../api2/js/util.js"></script> <script type="text/javascript" src="../../api2/js/images.js"></script> <script type="text/javascript" src="../../api2/js/sounds.js"></script> <script type="text/javascript" src="../../api2/js/colors.js"></script> <script type="text/javascript" src="../../api2/js/background.js"></script><script type="text/javascript" src="../../api2/js/api2.js"></script><script>window.onerror=function(errorMsg, url, lineNumber) { console.error("control_error: "+ errorMsg + ", lineNumber "+ lineNumber); };</script></head> </html>';


	var lint = function () {
		console.debug('lint');

		//1. jshint
		//1.1. Options
		//TODO: Add more options
		//http://jshint.com/docs/options/
		var options = {
			undef: true
		};

		//TODO: Add api....
		//Setting an entry to true enables reading and writing to that variable. Setting it to false will trigger JSHint to consider that variable read-only.
		var predef = {
			fill: false,
			sprite: false,
			text: false,
			collide: false,
			tween: false,
			particles: false,
			random: false,
			colors: false,
			x: false,
			y: false
		};

		JSHINT(this.code, options, predef);

		//TODO: Colocar el API...
		/*var context = {
				rect(a,b,c,d) {},
				random() {},
		};*/
		var context = {};
		BabyHint.init({ context });
		//var resultLint = JSHINT.data();

		//TODO: Verificar como desactivar algunas reglas de BabyHint
		//Example: If you want to define a function, you should use "var tap = function() {}; " instead!
		//function tap(){}
		//var results = BabyHint.babyErrors(this.code,JSHINT.errors);
		var results = JSHINT.errors;

		console.debug(results);
		var errors = [];
		for (var i = 0; i < results.length; i++) {
            var error = results[i];
            if (!error)
                continue;
            var raw = error.raw;
            var type = "error"; //"warning";"info";
			//TODO: Determinar el tipo de error. (Error, Warning, Info)
			//Se puede utilizar  error.code "W030", I001, E051
			//if (error.code === )
			//        type = "error";
            //   } else {
            //        type = "info";
            //    }
            errors.push({
                row: error.line, //error.line-1,
                column: error.character, //error.character-1,
                text: error.reason,
                type: type,
				code: error.code
                //raw: raw
				//priority: error.priority,
				//source: error.source 
            });

			/*
            errors.push({
                row: error.row, // error.line-1,
                column: error.column, //error.character-1,
                text: error.text, //error.reason,
                type: error.text, //type,
                //raw: raw
				priority: error.priority,
				source: error.source 
            });*/
		}
		return errors;
	}

	var _preload = function () {
		console.debug('_preload');
		var code = this.code;
		var options = { loc: true };
		var syntax = esprima.parse(code, options);

		var path = "$..[?(@.type=='CallExpression')]";
		var result = JSONPath({ path: path, json: syntax });

		var images = [];
		//Recorrer los elementos, para recuperar unicamente las funciones del API
		//que requiere imagenes
		result.forEach(function (element) {

			//TODO:MemberExpression. LLamadas a Metodos spring.chage
			//'type' => "MemberExpression"
			//property' ...
			//'type' => "Identifier"
			//'name' => "change"
			if (element.callee.type == "Identifier") {
				if (element.callee.name.toUpperCase() == "PARTICLES" ||
					element.callee.name.toUpperCase() == "SPRITE") {

					if (element.arguments.length > 0) {

						var item = element.arguments[0];

						if (item.type == "Literal") {
							images.push(item.value);
						} else if (item.type == "ArrayExpression") {

							item.elements.forEach(function (elementArray) {
								images.push(elementArray.value);
							}, this);
						}


					}
				}
			}
		}, this);

		var strImages = "";
		for (var index = 0; index < images.length; index++) {
			var element = images[index];
			if (index != 0) {
				strImages += ",";
			}
			//TODO: Excluir duplicados
			strImages += "'" + element.trim() + "'";
		}
		console.debug('strImages: ' + strImages);
		return strImages;
	}

	var load = function (code) {
		console.debug('load');

		this.code = code;

		//0. 
		reset();

		//1. JSHINT,  2. BabyHint
		var errors = lint();
		if (errors.length > 0) {
			var data = {
				errors: errors
			};

			postParent('load', data);

			return false;
		}

		//3. PreLoad
		//TODO: Analizar el codigo para obtener todos los recursos, 
		//para realizar precarga... 


		//4. Run Code
		var html = template; //.replace("@code", code);
		//console.log(html);

		this.iframe.addEventListener('load', function () {
			console.debug('iframe.load');

			//1. PreLoad
			var _resultPreload = _preload();
			var _result = _loadJavascriptPreload(_resultPreload);
			console.debug('result _loadJavascriptPreload : ' + _result);

			return true;

		}, false);

		this.iframe.addEventListener('preload', function () {
			console.debug('iframe.preload');
   		}, false);

		var doc = this.iframe.contentWindow.document;

		doc.addEventListener('preload', function () {
			console.debug('doc.preload'); 

			//2. LoadJavascript
			var _result = _loadJavascript();
			console.debug('_result _loadJavascript : ' + _result);

			postParent('load', null);
		}, false);

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

		console.debug('postParent');

		var msg = JSON.stringify({
			data: {}
			, type: 'load-childer'
		});

		if (this.iframe) {
			var post = (this.iframe.contentWindow) ? this.iframe.contentWindow :
			(this.iframe.contentDocument.document) ? this.iframe.contentDocument.document : this.iframe.contentDocument;
 			if (post) {
				//TODO: ....
				// Send the data to the frame using postMessage
				post.postMessage(msg, '*');
			}
        }
	}

	// All the actions available.
	var actions = {
		load: load
	};


	this.handleMessage = function (event) {

		console.debug('handleMessage');
		console.debug(event);
		//TODO: Mejorar 
		frameSource = event.source;
		frameOrigin = event.origin;

		console.debug(event.source);
		console.debug(event.origin);

		var msg;
		try {
			msg = JSON.parse(event.data);
		} catch (err) {
			// We are only concerned in JSON messages.
			console.error(err);
			return;
		}

		var type = msg.type
			, data = msg.data;

		//TODO: Segun el tipo ejecutar la function/action
		// Route message to the correct action.
		//actions[type](data);  
		//Load
		load(data);
	}

	this.handleError = function (msg, url, lineNo, columnNo, error) {

		//TODO: Mejorar el control de excepciones
		console.error('handleError => msg: ' + msg);
		/*
		var string = msg.toLowerCase();
		var substring = "script error";
		if (string.indexOf(substring) > -1) {
			console.error('Script Error: See Browser Console for Detail');
		} else {
			console.error(msg, url, lineNo, columnNo, error);
		}*/
		return false;
	}

	this.handlePreLoad = function (event) {
		console.debug('this.handlePreLoad');
	}
}




var output = new campusoft.game.Output();

// Handle messages coming in from the parent frame
if (window.addEventListener) {
	window.addEventListener('message', output.handleMessage, false);
	window.addEventListener('error', output.handleError, false);
	window.addEventListener('preload', output.handlePreLoad, false);
} else if (window.attachEvent) { // ie8
	window.attachEvent('onmessage', output.handleMessage);
	window.attachEvent('onerror', output.handleError);
	window.attachEvent('onpreload', output.handlePreLoad);
}
