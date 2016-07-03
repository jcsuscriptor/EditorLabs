/**
* @author   Juan Carlos Saavedra <@jc_suscriptor>
*/

var campusoft = campusoft || {};
if (!campusoft.game) campusoft.game = {};
if (!campusoft.game.default) campusoft.game.default = {};

var GAME_WIDTH = 600;
var GAME_HEIGHT = 600;


//Default Values
campusoft.game.default.color = "white";
campusoft.game.default.backgroundColor = campusoft.game.colorNameToHex("black");

//Direct Variables
var colors = campusoft.game.colors;

//Variables
var x;
var y;

//initialize the framework
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game');

//List collisions
campusoft.game.collideList = [];

campusoft.game.main = function (game) {
	console.info("campusoft.game.main");
};

campusoft.game.main.prototype = {
	
	preload: function () {
		console.info("campusoft.game.main.preload");

		//TODO: Aplicar esta propiedad para cuando se utiliza desde un  edit y presiona ejecutar el codigo escrito. Es mejor establecer por propiedades desdes segun sea quien llame. Ejemplo si es modo edit, true, pero si la aplicacion se esta ejecutando normalmente false
		//keep running on losing focus
		game.stage.disableVisibilityChange = true;

	},

	create: function () {
		console.info("campusoft.game.main.create");
		
		//http://phaser.io/examples/v2/input/input-priority
		//game.input.priorityID = 0;

		//TODO: Mejorar activacion por default
		//enabled physics 
		game.physics.startSystem(Phaser.Physics.ARCADE);


		//TODO: para que srive preventDefault
		//game.input.touch.preventDefault = false;
		//game.input.onTap.add(_onTap, this);
		this.input.onDown.add(_onTap, this);
	},

	update: function () {
		//collide
		for (index = 0; index < campusoft.game.collideList.length; ++index) {

			var _collide = campusoft.game.collideList[index];

			game.physics.arcade.overlap(_collide.obj1, _collide.obj2, _collide.collisionHandler, null, this);
		}

		if (window.loop && (typeof window.loop == 'function')) {
			
			window.loop();
		}
	}
};

game.state.add("main", campusoft.game.main);
game.state.start("main");

/**
 * Create Sprite
 * 
 * @class campusoft.game.Sprite
 * @extends Phaser.Sprite
 * @constructor
 * @param {object} game - A reference to the currently running game. The Game object Phaser
 * @param {number} x - The x coordinate (in world space) to position the Sprite at.
 * @param {number} y - The y coordinate (in world space) to position the Sprite at.
 * @param {string} name - This is the image or texture used by the Sprite during rendering.
 * @param {string|number} frame - If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
campusoft.game.Sprite = function (game, x, y, name, frame) {
    console.debug('campusoft.game.Sprite');

	this.game = game;

	/**
    * @property {string} name - Name
	* @readonly
    */
	this.name = name;

	/**
    * @property {campusoft.game.asset.images} image - Associated Image
    * @readonly
    */
	this.image = undefined;

	if (campusoft.game.asset.images[this.name]) {
		this.image = campusoft.game.asset.images[this.name];
	} else {
		this.image = campusoft.game.asset.images['fillnotfound'];
	}

    var _checkKey = game.cache.checkKey(Phaser.Cache.IMAGE, this.name);

	//TODO: Si la imagen no esta load, como bloquear hasta que se carge la imagen luego crear el objeto Phaser.Sprite
	if (!_checkKey) {
		var _loadComplete = function (name) {
			this.loadTexture(this.name);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			console.debug('campusoft.game.Sprite._loadComplete');
		};

		Phaser.Sprite.call(this, game, x, y, this.name, frame);
		//game.physics.enable(this, Phaser.Physics.ARCADE);
		//game.physics.arcade.enable(this);

		//this.game.load.onLoadStart.addOnce(_loadStart, this);
		game.load.onLoadComplete.addOnce(_loadComplete, this, 0, this.name);
		game.load.image(this.name, getFullPath(this.image.src));
		game.load.start();

	} else {
		Phaser.Sprite.call(this, game, x, y, this.name, frame);

		//game.physics.enable(this, Phaser.Physics.ARCADE);
		game.physics.arcade.enable(this);
	}

};

campusoft.game.Sprite.prototype = Object.create(Phaser.Sprite.prototype);
campusoft.game.Sprite.prototype.constructor = campusoft.game.Sprite;


/**
 * Move sprite to X,Y position
 * 
 * @method move
 * @param {number} x - The x coordinate (in world space) to move the Sprite.
 * @param {number} y - The y coordinate (in world space) to move the Sprite. 
 */
campusoft.game.Sprite.prototype.move = function (x, y) {
	this.x = x;
	this.y = y;
};


/**
 * Changes the image or texture used by the Sprite during rendering.
 * 
 * @method change
 * @param {string} newName - This is the image or texture used by the Sprite during rendering.
 */
campusoft.game.Sprite.prototype.change = function (newName) {
	console.debug("campusoft.game.Sprite.prototype.change");
	this.name = newName;

	if (campusoft.game.asset.images[this.name]) {
		this.image = campusoft.game.asset.images[this.name];
	} else {
		this.image = campusoft.game.asset.images['fillnotfound'];
	}

    var _checkKey = this.game.cache.checkKey(Phaser.Cache.IMAGE, this.name);

	//TODO: Si la imagen no esta load, como bloquear antes de crear la instancia
	if (!_checkKey) {
		var _loadComplete = function (name) {
			this.loadTexture(this.name);
		};

		this.game.load.onLoadComplete.addOnce(_loadComplete, this, 0, this.name);


		this.game.load.image(this.name, getFullPath(this.image.src));
		this.game.load.start();
	} else {
		this.loadTexture(this.name);
	}
};


/**
 * 
 * 
 * @param {any} fnName
 */
campusoft.game.Sprite.prototype.tap = function (fnName) {

	if (typeof fnName !== 'function') {
		throw new Error('Sprite.tap: fnName es un parametro requerido de {fn}() y deberia ser una funcion'.replace('{fn}', fnName));
	}

	this.inputEnabled = true;
	this.events.onInputDown.add(fnName, this);

};


/**
 * 
 * 
 * @param {any} fnName
 */
campusoft.game.Sprite.prototype.drag = function (fnName) {

	if (typeof fnName !== 'function') {
		throw new Error('Sprite.tap: fnName es un parametro requerido de {fn}() y deberia ser una funcion'.replace('{fn}', fnName));
	}

	this.inputEnabled = true;
	this.input.enableDrag();
	this.events.onDragStop.add(fnName, this);
};


/**
 * Create a new game object for displaying Text.
 * 
 * @class campusoft.game.Text
 * @extends Phaser.Text
 * @constructor
 * @param {object} game - A reference to the currently running game. The Game object Phaser
 * @param {string} text - The actual text that will be written.
 * @param {number} x - The x coordinate (in world space) to position the text at.
 * @param {number} y - The x coordinate (in world space) to position the text at.
 * @param {string} color - Name Color 
 * @param {object} [style] - The style properties to be set on the Text.
 * @param {string} [style.font='bold 20pt Arial'] - The style and size of the font.
 * @param {string} [style.fontStyle=(from font)] - The style of the font (eg. 'italic'): overrides the value in `style.font`.
 * @param {string} [style.fontVariant=(from font)] - The variant of the font (eg. 'small-caps'): overrides the value in `style.font`.
 * @param {string} [style.fontWeight=(from font)] - The weight of the font (eg. 'bold'): overrides the value in `style.font`.
 * @param {string|number} [style.fontSize=(from font)] - The size of the font (eg. 32 or '32px'): overrides the value in `style.font`.
 * @param {string} [style.backgroundColor=null] - A canvas fillstyle that will be used as the background for the whole Text object. Set to `null` to disable.
 * @param {string} [style.fill='black'] - A canvas fillstyle that will be used on the text eg 'red', '#00FF00'.
 * @param {string} [style.align='left'] - Horizontal alignment of each line in multiline text. Can be: 'left', 'center' or 'right'. Does not affect single lines of text (see `textBounds` and `boundsAlignH` for that).
 * @param {string} [style.boundsAlignH='left'] - Horizontal alignment of the text within the `textBounds`. Can be: 'left', 'center' or 'right'.
 * @param {string} [style.boundsAlignV='top'] - Vertical alignment of the text within the `textBounds`. Can be: 'top', 'middle' or 'bottom'.
 * @param {string} [style.stroke='black'] - A canvas stroke style that will be used on the text stroke eg 'blue', '#FCFF00'.
 * @param {number} [style.strokeThickness=0] - A number that represents the thickness of the stroke. Default is 0 (no stroke).
 * @param {boolean} [style.wordWrap=false] - Indicates if word wrap should be used.
 * @param {number} [style.wordWrapWidth=100] - The width in pixels at which text will wrap.
 * @param {number} [style.tabs=0] - The size (in pixels) of the tabs, for when text includes tab characters. 0 disables. Can be an array of varying tab sizes, one per tab stop.
 */
campusoft.game.Text = function (game, text, x, y, color, style) {
	console.debug('campusoft.game.Text');

	var _color; // private member
	if (color === undefined || color === null || !campusoft.game.colors[color]) {
		_color = campusoft.game.default.color;
	} else {
		_color = color.toLowerCase();
	}

	Object.defineProperty(this, "color", {
		get: function () {
			return _color;
		},
		set: function (value) {
			if (value === undefined || value === null || !campusoft.game.colors[value]) {
				_color = campusoft.game.default.color;
			} else {
				_color = value.toLowerCase();
			}
			this.fill = campusoft.game.colorNameToHex(_color);
		}
	});

	//TODO: Revisar como se pasa informacion de style
	var _styleDefault = { 'fill': campusoft.game.colorNameToHex(this.color) };
	if (style !== undefined) {
		_styleDefault = style;
		_styleDefault.fill = campusoft.game.colorNameToHex(this.color);
		/* 
		style = style || {};
		style.font = style.font || 'bold 20pt Arial';
		style.backgroundColor = style.backgroundColor || null;
		style.fill = style.fill || 'black';
		style.align = style.align || 'left';
		style.boundsAlignH = style.boundsAlignH || 'left';
		style.boundsAlignV = style.boundsAlignV || 'top';
		style.stroke = style.stroke || 'black'; //provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
		style.strokeThickness = style.strokeThickness || 0;
		style.wordWrap = style.wordWrap || false;
		style.wordWrapWidth = style.wordWrapWidth || 100;
		style.shadowOffsetX = style.shadowOffsetX || 0;
		style.shadowOffsetY = style.shadowOffsetY || 0;
		style.shadowColor = style.shadowColor || 'rgba(0,0,0,0)';
		style.shadowBlur = style.shadowBlur || 0;
		style.tabs = style.tabs || 0;
		*/
	}

	Phaser.Text.call(this, game, x, y, text, _styleDefault);
};

campusoft.game.Text.prototype = Object.create(Phaser.Text.prototype);
campusoft.game.Text.prototype.constructor = campusoft.game.Text;


/**
 * 
 * 
 * @param {any} fnName
 */
campusoft.game.Text.prototype.tap = function (fnName) {

	if (typeof fnName !== 'function') {
		throw new Error('Sprite.tap: fnName es un parametro requerido de {fn}() y deberia ser una funcion'.replace('{fn}', fnName));
	}

	this.inputEnabled = true;
	this.events.onInputDown.add(fnName, this);
};


campusoft.game.Group = function (game, name) {
	console.debug('campusoft.game.Group');

	Phaser.Group.call(this, game, name);

	this.classType = campusoft.game.Sprite;
};

campusoft.game.Group.prototype = Object.create(Phaser.Group.prototype);
campusoft.game.Group.prototype.constructor = campusoft.game.Group;



campusoft.game.Tween = function (target, game, manager) {
	console.debug('campusoft.game.Tween');

	Phaser.Tween.call(this, target, game, manager);
};

campusoft.game.Tween.prototype = Object.create(Phaser.Tween.prototype);
campusoft.game.Tween.prototype.constructor = campusoft.game.Tween;

campusoft.game.Tween.prototype.to = function (properties, duration, ease, autoStart, delay, repeat, yoyo) {

	if (duration === undefined || duration <= 0) { duration = 1000; }
	if (ease === undefined || ease === null) { ease = Phaser.Easing.Default; }

	//Change autoStart = true. Default
	if (autoStart === undefined) { autoStart = true; }
	if (delay === undefined) { delay = 0; }
	if (repeat === undefined) { repeat = 0; }
	if (yoyo === undefined) { yoyo = false; }

	Phaser.Tween.prototype.to.call(this, properties, duration, ease, autoStart, delay, repeat, yoyo);

	return this;
};

campusoft.game.Tween.prototype.from = function (properties, duration, ease, autoStart, delay, repeat, yoyo) {

	if (duration === undefined || duration <= 0) { duration = 1000; }
	if (ease === undefined || ease === null) { ease = Phaser.Easing.Default; }

	//Change autoStart = true. Default
	if (autoStart === undefined) { autoStart = true; }
	if (delay === undefined) { delay = 0; }
	if (repeat === undefined) { repeat = 0; }
	if (yoyo === undefined) { yoyo = false; }

	Phaser.Tween.prototype.from.call(this, properties, duration, ease, autoStart, delay, repeat, yoyo);

	return this;
};

campusoft.game.collide = function (obj1, obj2, collisionHandler) {
	console.debug('campusoft.game.collide');
	this.obj1 = obj1;
	this.obj2 = obj2;
	this.collisionHandler = collisionHandler;
};

/**
 * Returns a random number, according to parameters 
 * 
 * random() - With no parameters returns 0 to 1.
 * random(20) - A numeric parameter, returns a value of 0 to the parameter.
 * random([1,2,3,4]) - A matrix type parameter, returns a random array element.
 * random(colors) - A {campusoft.game.colors} type parameter, returns a random color.
 * random(10,50) - Two numerical parameters, return parameters random number between first and second parameter.
 * 
 * @returns {number} random number 
 */
var random = function () {

	if (arguments.length == 2) {
		//Range
		var min = arguments[0];
		var max = arguments[1];
		if ((typeof min === 'number') && (typeof max === 'number')) {
			return Math.floor(Math.random() * (max - min) + min);
		} else {
			throw new Error(i18n._('random: Los parametros deben ser numeros'));
		}

	} else if (arguments.length == 1) {
		
		var ele = arguments[0];
		
		var type = typeof ele;

		if (Array.isArray(ele)) {
			
			return ele[Math.floor(Math.random() * ele.length)];

		} else if (type === 'object') {
			//colors
			if (ele === campusoft.game.colors) {
				var _i = Math.floor(Math.random() * Object.keys(ele).length);
				return Object.keys(campusoft.game.colors)[_i];
			} else {
				//Error
				throw new Error(i18n._('random: ele es un parametro requerido. Debe ser colors, array, number'));
			}
		} else if (type === 'number') {
			return Math.floor(Math.random() * ele);
		}

	} else if (arguments.length === 0) {
		return Math.random();
	}

	throw new Error(i18n._('random: parametros erroneos'));
};

 
/**
 * 
 * It lets fill the screen with a color or an image.
 * 
 * @param {string} name - The name of the image or color.
 * @returns {boolean} true/false
 */
var fill = function (name) {
	//TODO: Validate arguments
	//not null
	var _name = name.toLowerCase();
	if (!campusoft.game.asset.background[_name] && !campusoft.game.colors[_name]) {
		var _msg = i18n._("El parametro [name] debe ser un nombre de imagen o nombre de color");
		throw _msg;
	}

	if (campusoft.game.colors[_name]) {
		var _hex = campusoft.game.colorNameToHex(_name);
		game.stage.backgroundColor = _hex;
		return true;
	}

	if (campusoft.game.asset.background[_name]) {
		var _data = campusoft.game.asset.background[_name];

		var _loadBackgroundImage = function () {
			console.log("loadBackgroundImage....");
			if (!campusoft.game.asset.bgSprite) {
				campusoft.game.asset.bgSprite = game.add.sprite(0, 0, _data.name);
				campusoft.game.asset.bgSprite.x = 0;
				campusoft.game.asset.bgSprite.y = 0;
				campusoft.game.asset.bgSprite.height = game.height;
				campusoft.game.asset.bgSprite.width = game.width;
			} else {
				campusoft.game.asset.bgSprite.loadTexture(_data.name);
			}
		};

		game.load.onLoadComplete.addOnce(_loadBackgroundImage, this);
		game.load.image(_data.name, getFullPath(_data.src));

		game.load.start();
		return true;
	}

	return false;
};

 
/**
 * Create Sprite
 * 
 * @param {string} name - This is name the image or texture used by the Sprite during rendering.
 * @param {number} x - The x coordinate (in world space) to position the Sprite at.
 * @param {number} y - The y coordinate (in world space) to position the Sprite at.
 * @returns {campusoft.game.Sprite}
 */
var sprite = function (name, x, y) {
	var _x = x || 0;
	var _y = y || 0;

	var _sprite = new campusoft.game.Sprite(game, _x, _y, name);
	game.add.existing(_sprite);

	return _sprite;
};


var text = function (text, x, y, color, style) {

	if (x === undefined) { x = 0; }
	if (y === undefined) { y = 0; }

	//TODO: Segun la cantidad de parametros retornar un object Text:

	//Pasar solo 0 parametros () => ERROR 
	//Pasar solo 1 parametros (string) => text 
	//Pasar solo 2 parametros (string,string) => text,color
	//Pasar solo 2 parametros (string,number) => text,x
	//Pasar solo 2 parametros (number,number) => ERROR
	//Pasar solo 3 parametros (string,string,string) =>text,color,style
	//Pasar solo 3 parametros (string,number,number) => text,x,y
	//Pasar solo 3 parametros (string,number,string) => text,x,color ??

	var _text = new campusoft.game.Text(game, text, x, y, color, style);
    game.add.existing(_text);

    return _text;
};

 
var group = function (name) {
	var _group = new campusoft.game.Group(game, name);
    return _group;
};

 
var tween = function (target) {
	/*
	* TODO: Revisar si es necesario verificar el tipo de dato.
	if (!target instanceof campusoft.game.Sprite){
		//Error
	}
	*/
	var _tween = new campusoft.game.Tween(target, game, game.tweens);
	return _tween;
};

 
var collide = function (obj1, obj2, collisionHandler) {

	if (!collisionHandler)
		return false;

	var _obj = new campusoft.game.collide(obj1, obj2, collisionHandler);
	campusoft.game.collideList.push(_obj);

	return true;
};


function _onTap(pointer) {
	x = game.input.x;
	y = game.input.y;
	if (window.tap && (typeof window.tap == 'function')) {
		window.tap(pointer);
	}
};