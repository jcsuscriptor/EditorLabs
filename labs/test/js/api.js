var campusoft = campusoft || {};

campusoft.backgroundColor = campusoft.colorNameToHex("black");
campusoft.color = campusoft.colorNameToHex("white"); 

campusoft.NAME_SPRITE_BACKGROUND = "campusoft.spriteBackgroudImage";
campusoft.backgroundImage = undefined;
campusoft.backgroundImageSprite = undefined;

var x;

var y;

campusoft.spriteList = new Array();
campusoft.soundList = new Array();
campusoft.geometryList  = new Array();
campusoft.textList  = new Array();

campusoft.groupList = new Array();
campusoft.collideList = new Array();

var LEFT = 'left';
var DOWN = 'down';
var RIGHT = 'right';
var UP = 'up';


//todo: mejorar el width.height game
var game = new Phaser.Game(800,600, Phaser.AUTO, 'program', { preload: preload, create: 
create, update: update,  render: render });

campusoft.wrapperObj = function(){
	
	 /**
     * [read-only] The object container that contains this object.
     *
     * @property parent
     * @type wrapperObj
     * @readOnly
     */
    this.parent = null;
	
	this._wrapper = undefined;
	
	Object.defineProperty(this,"wrapper",{
		get: function() { 
			return _wrapper; 
		},
		set: function(value) { 
			_wrapper = value; 
		}
	});
};
	
campusoft.spriteObj = function(name,x,y){ 
  console.log('Create spriteObj:'+name + ". x:"+x+". y:"+y);
 
  //Llamamos al constructor padre, nos aseguramos (utilizando Function#call) que "this" se
  // ha establecido correctamente durante la llamada
  //Persona.call(this, primerNombre);
  
  this.wrapper = undefined;
  
   /**
    * @property {Array} animationValue - An Array of Animation Data.
    */
  //TODO: debe ser private
  this.animationValue = [];
 	
  this.tapValue = null;    
	
 
  
  this.name = name;
  
  if (campusoft.imagesObj[this.name]) {
	 this.imageObj = campusoft.imagesObj[this.name];
  }else{
	 this.imageObj = campusoft.imagesObj['fillnotfound']; 
  }
  
  
  var _x = x; // private member
  Object.defineProperty(this,"x",{
    get: function() { 
		if (this.wrapper){
			if (this.wrapper.x != _x)
				_x = this.wrapper.x;
		}
		return _x; 
	},
    set: function(value) { 
		_x = value;
		if (this.wrapper){
			this.wrapper.x = _x;
		}
	}
  });
  
  
  
  var _y = y; // private member
  Object.defineProperty(this,"y",{
    get: function() {
		if (this.wrapper){
			if (this.wrapper.y != _y)
				_y = this.wrapper.x;
		}
		return _y; 
	},
    set: function(value) { 
		_y = value;
		if (this.wrapper){
			this.wrapper.y = _y;
		}
	}
  });
  
 
  var _originalHeight = this.imageObj.height;
  var _originalWidth= this.imageObj.width;
 
  var _width = _originalHeight; // private member
  Object.defineProperty(this,"width",{
    get: function() { 
		return _width; 
	},
    set: function(value) { 
		_width = value;
		if (this.wrapper){
			this.wrapper.width = _width;
		}
	}
  });
  
  var _height = _originalWidth; // private member
  Object.defineProperty(this,"height",{
    get: function() { 
		return _height; 
	},
    set: function(value) { 
		_height = value;
		if (this.wrapper){
			this.wrapper.height = _height;
		}
	}
  });
  
  
  var _alpha = 1; // private member
  Object.defineProperty(this,"alpha",{
    get: function() { 
		return _alpha; 
	},
    set: function(value) { 
		_alpha = value;
		console.info('this.wrapper.alpha'+this.wrapper)
		if (this.wrapper){
			this.wrapper.alpha = _alpha;
		}
	}
  });
  
  var _visible = 1; // private member
  Object.defineProperty(this,"visible",{
    get: function() { 
		return _visible; 
	},
    set: function(value) { 
		_visible = value;
		if (this.wrapper){
			this.wrapper.visible = _visible;
		}
	}
  });
  
  
  var _scale = 100; // private member
  Object.defineProperty(this,"scale",{
    get: function() { 
		return _scale; 
	},
    set: function(value) { 
		_scale = value;
		if (this.wrapper){
			this.wrapper.scale.x = _scale/100;
			this.wrapper.scale.y = _scale/100;
		}
	}
  });
  
  var _rotate = 0; // private member
  Object.defineProperty(this,"rotate",{
    get: function() { 
		return _rotate; 
	},
    set: function(value) { 
		_rotate = value;
		if (this.wrapper){
			this.wrapper.angle = _rotate;
		}
	}
  });
  
  
  this._CreateSprite = function(name){
	console.log('_CreateSprite...');
	   
	this.wrapper = game.add.sprite(this.x, this.y, this.name);
	this.width = this.wrapper.width;
	this.height =  this.wrapper.height;
	
	this.wrapper.alpha = this.alpha;
	
	//TODO: Default ?? o configuraciones
	this.wrapper.anchor.setTo(0.5, 0.5);
	
	/*
	if (this.width){
		this.sprite.width = this.width;
	}
	
	if (this.height){
		this.sprite.height = this.height;
	}
	*/
	
	if (this.rotate && this.rotate >0){
		console.info('this.rotate:'+this.rotate);
		this.wrapper.angle = this.rotate; 
	}
	
	if (this.scale){
		console.info('this.scale:'+this.scale);
		this.wrapper.scale.x = this.scale/100;
		this.wrapper.scale.y = this.scale/100;
	}
	
	if ((this.tapValue) && (typeof this.tapValue === 'function')){
		
		this.wrapper.inputEnabled = true;
		
		this.wrapper.events.onInputDown.add(this.tapValue); //,this);
	}
  }
  
  //game.isRunning
  if (game.isBooted){
	   console.log('Sprite.game.isBooted: ' + game.isBooted);

	   var loadSpriteStart = function(){
			console.log("Sprite.loadSpriteStart....");
	   }
 	   var loadSprite = function(name){
		    console.log("Sprite.loadSprite: "+ name);
		    this._CreateSprite(name);
	   }
	   
	   var _checkKey = game.cache.checkKey(Phaser.Cache.IMAGE,this.name);
	   
	   if (_checkKey){
		   
		   this._CreateSprite(this.name);
		   
	   }else{
		   game.load.onLoadStart.addOnce(loadSpriteStart, this);
		   //game.load.onFileComplete.addOnce(fileComplete, this);
		   game.load.onLoadComplete.addOnce(loadSprite, this,0,this.name);
		   
		   game.load.image(this.name, this.imageObj.src);
		   game.load.start();
	   }
  }
};
  
campusoft.spriteObj.prototype =  Object.create(campusoft.wrapperObj.prototype);  
campusoft.spriteObj.prototype.constructor = campusoft.spriteObj;
   
campusoft.spriteObj.prototype = {
 
	move : function(x,y) {
		//console.info('move');
		this.x = x;
		this.y = y;
		
		//return this;
	}, 
	
	animation: function(properties,duration){
		//todo: mejorar... 
		//TODO: VALIDAR properties
		//TODO: como agregar otra animacion ??
		//TODO: como agregar secuencia de animaciones
		if (duration === undefined || duration <= 0) { duration = 1000; }
		 
		this.animationValue.push({p:properties,d:duration});
		
		if (this.wrapper){
			//Add tween
			game.add.tween(this.wrapper).to(properties, duration, Phaser.Easing.Linear.None, true);
		}
		
		//return this;
	},
	tap : function(callback) {
		
		if (typeof callback !== 'function')
        {
            throw new Error('Sprite.tap: callback es un parametro requerido de {fn}() y deberia ser una funcion'.replace('{fn}', fnName));
        }
		
		if (callback){
			
			console.log('set value tap');
			
			//TODO: establecer tap como propiedad
			this.tapValue = callback;
			 
			if (this.wrapper){
				
				this.wrapper.inputEnabled = true;
				
				this.wrapper.events.onInputDown.add(this.tapValue); //,this);
			}
		}
	},
	
	change : function(newName){
		this.name = newName;
		
		if (campusoft.imagesObj[this.name]) {
			 this.imageObj = campusoft.imagesObj[this.name];
		}else{
			 this.imageObj = campusoft.imagesObj['fillnotfound']; 
		}
		
		if (!this.wrapper)
			return;
			
		if (game.isBooted){
			var loadSpriteChangeStart = function(){
				console.log("Change Sprite.Loading....");
			}
		   var loadChangeSprite = function(){
				this.wrapper.loadTexture(this.name);
		   }
		   
		   game.load.onLoadStart.addOnce(loadSpriteChangeStart, this);
		   //game.load.onFileComplete.addOnce(fileComplete, this);
		   game.load.onLoadComplete.addOnce(loadChangeSprite, this);
		   
		   game.load.image(this.name, this.imageObj.src);
		   game.load.start();
		}
		
		//return this;
	},
	
	destroy : function(){
		if (!this.wrapper)
			return;
		
		if (this.parent instanceof campusoft.groupObj) {
			
			this.parent.remove(this);
			
		}
			
		
		this.wrapper.destroy();
	},
	
	enablePhysical: function(){
		
		if (!this.wrapper)
			return;
		
		//TODO: Determinar si va ARCADE o P2
		game.physics.enable(this.wrapper, Phaser.Physics.ARCADE);
		
		 
	}
};



function _onDecodedPlaySound(obj){
	console.log('_onDecodedPlaySound');
	obj.play();
}
 
campusoft.soundObj = function(name, play){ 
  console.log('Create soundObj:'+name);
  
  this.playValue = play;
  
  this.name = name;
  
  if (campusoft.sounds[name]) {
	 this.soundObj = campusoft.sounds[name];
  }else{
	  //TODO: Si no existe sonido se asigna uno por default?
	 this.soundObj = undefined; 
  }
  
  
  //game.isRunning
  if (game.isBooted){
	   console.log('Sound.game.isBooted: ' + game.isBooted);
	   //this.audio = undefined; 
	   var loadAudioStart = function(){
		  console.log("Sound.Load Audio Start.:"+this.name);
	   }
	   
	   var loadAudio = function(){
		    this.audio = game.add.audio(this.name);
			
			if (this.playValue){
				console.log("Sound.PlayAudio.game.isBooted:"+this.name);
				//TODO: Decoded MP3
				//this.audio.onDecoded.add(_onDecodedPlaySound, this.audio);
				this.audio.play();
				
			}
			console.log("Sound.Load Audio Complete:"+this.name);
	   }
	   
	   //TODO: VERIFICAR SI EL RECURSO YA NO ESTA LOAD ??
	   
	   game.load.onLoadStart.addOnce(loadAudioStart, this);
       //game.load.onFileComplete.addOnce(fileComplete, this);
       game.load.onLoadComplete.addOnce(loadAudio, this);
	   
	   game.load.audio(this.name, this.soundObj.src);
       game.load.start();
  }else{
	  this.audio = undefined; 
  }
}

campusoft.soundObj.prototype = {
	 
	play : function () {
        this.playValue = true;

		if (this.audio){
			console.log("play.sonido");
		 	 
			//this.audio.onDecoded.add(_onDecodedPlaySound, this.audio);
			this.audio.play();
		}

    },
	stop : function() {
		this.playValue = false;
		
		if (this.audio){
			console.log("stop.sonido");
			this.audio.stop();
		}
	}
};
 
campusoft.textObj  = function(text,x,y,color){
	console.log('Create textObj');
	
	this.x = x;
	this.y = y;
	this.textValue = text;
	 
	if (color && campusoft.colors[color.toLowerCase()]){
		this.colorValue =  campusoft.colorNameToHex(color);
 	}else{
		//default
		this.colorValue =  campusoft.color;
 	}
	
	this.styleValue = {'fill': this.colorValue };

	if (game.isBooted){
		console.log('Text.game.isBooted: ' + game.isBooted);
		
		this.text = game.add.text(this.x,this.y, this.textValue,this.styleValue);
	}else{
		this.text = undefined;
	}
}
 
campusoft.textObj.prototype = {
	change: function(newText){
		this.textValue = newText;
		this.text.text = this.textValue;
	}
};
	
campusoft.geometryObj = function(obj,color){
	//TODO: MEJORAR, add propiedades, metodos, 
	//creacion de objetos de phaser
	this.obj = obj;
	this.color = color;

}

campusoft.collideObj = function(obj1,obj2, collisionHandler){
	//TODO:  Verificar si obj1 y obj2 son sprite
	
	this.obj1 = obj1;
	this.obj2 = obj2;
	this.collisionHandler = collisionHandler;

	if (game.isBooted){
		
		console.log('collideObj.game.isBooted: ' + game.isBooted);
		
		this.enablePhysical();
	}
};

campusoft.collideObj.prototype = {
 	enablePhysical : function() {
		
		if (this.obj1 instanceof campusoft.spriteObj){
			console.log('enablePhysical.campusoft.sprite');
			this.obj1.enablePhysical();
		
		}else if (this.obj1 instanceof campusoft.groupObj){ 
			console.error('enablePhysical campusoft.groupObj');
			
			var _i;
			for(_i = 0;_i<this.obj1.hash.length;++_i){
				var _child = this.obj1.hash[_i];
				if (_child instanceof campusoft.spriteObj){
					_child.enablePhysical(); 
				}else{
					console.error('enablePhysical no se puede aplicar');
				}
			}
		}else {
			console.error('enablePhysical no se puede aplicar');
		}
		
		if (this.obj2 instanceof campusoft.spriteObj){
			console.log('enablePhysical.campusoft.sprite');
			this.obj2.enablePhysical();
		
		}else if (this.obj2 instanceof campusoft.groupObj){ 
			console.log('enablePhysical campusoft.groupObj');
			
			var _i;
			for(_i = 0;_i<this.obj2.hash.length;++_i){
				var _child = this.obj2.hash[_i];
				if (_child instanceof campusoft.spriteObj){
					_child.enablePhysical(); 
				}else{
					console.error('enablePhysical no se puede aplicar');
				}
			}
		}else {
			console.error('enablePhysical no se puede aplicar');
		}
	 
	}	
};

campusoft.groupObj = function(){
	this.wrapper = undefined;
	
	this.hash = [];
	 
	/**
	* Total number of children in this group.
	*
	* @name campusoft.groupObj#length
	* @property {integer} length 
	* @readonly
	*/
	Object.defineProperty(this, "length", {
		get: function () {
			return this.hash.length;
		}
	}); 
	 
	if (game.isBooted){
		this.wrapper = game.add.group();
	}
};

 
campusoft.groupObj.prototype =  Object.create(campusoft.wrapperObj.prototype);
campusoft.groupObj.prototype.constructor = campusoft.groupObj;
	

campusoft.groupObj.prototype = {
 	add : function(child) {
		//TODO: SE DEBE VERIFICAR QUE TIPO OBJETO SE PUEDE ADICIONAL
		//sprite
		//text ??
		//geometrias ??
		if (!child && !child instanceof campusoft.spriteObj) 
			return false;
			
		var index = this.hash.indexOf(child);

        if (index === -1)
        {
            this.hash.push(child);
			console.log('groupObj.push');	
        }else{
			console.log('groupObj.add - ya existe');	
		}
		
		child.parent = this;
		
		if (!this.wrapper){
			console.log('groupObj.add - sin wrapper');
			return true;
		}
	
		console.log('groupObj.add - directo ');
	
		this.wrapper.add(child.wrapper);
		
		return true;
	},
	
	remove: function(child) {
		if (child)
		{
			var index = this.hash.indexOf(child);

			if (index !== -1)
			{
				this.hash.splice(index, 1);
				return true;
			}
		}
		return false;
	},
	
	getAt: function (index) {
		if (index < 0 || index >= this.hash.length)
		{
			//TODO: Lanzaer errores 
			//throw new Error('getAt: Supplied index '+ index +' does not exist in the child list');
			return -1;
		}
		else
		{
			return this.hash[index];
		}
	}
};




var sprite = function(name,x,y) {
	var _x = x || 0;
	var _y = y || 0;
   
   //TODO: si ya existe name ??
   console.log("sprite....");
   
   var _spriteObj = new campusoft.spriteObj(name,_x,_y);
   campusoft.spriteList.push(_spriteObj);
   
   return _spriteObj;
}

var group  = function(){
   console.log("group....");
   var _groupObj = new campusoft.groupObj();
   campusoft.groupList.push(_groupObj);
   return _groupObj;
}

var sound = function(name,play) {
	//TODO: play default ???
   var _play = 	true;
   if (play != undefined)
	   _play = play;
	
   //TODO: si ya existe name ??
   console.log("sound....");
   
   var _soundObj = new campusoft.soundObj(name,_play);
   campusoft.soundList.push(_soundObj);
   
   return _soundObj;
}

var text = function(text,x,y,color) {
   var _x = x || 0;
   var _y = y || 0;
	
   console.log("text....");
   
   var _textObj = new campusoft.textObj(text,_x,_y,color);
   campusoft.textList.push(_textObj);
   
   return _textObj;
}

var fill = function(nameFill) {
	//TODO: Validar parametros
	if (!nameFill)
		return;
	
	var _nameFill = nameFill.toLowerCase();
	//TODO: Aplicar sobrecarga arguments.length
	var isImage = false;
	//1. Verificar si existe una imagen con el nombre
	if (campusoft.background[_nameFill]) {
		console.log('backgroundImage: ' + _nameFill);
		campusoft.backgroundImage = campusoft.background[_nameFill];
		isImage = true;
	}
	 
	//2. Verificar color
	if (campusoft.colors[_nameFill]){
		console.log('backgroundColor: ' + _nameFill);
		hex =  campusoft.colorNameToHex(_nameFill);
		campusoft.backgroundColor = hex;
		isImage = false;
	}
	
	//TODO: QUE PASA SI NO ES NOMBRE DE IMAGEN, NOMBRE DE COLOR.. ERROR
	
	if (game.isBooted){
		console.log("fill.game.isBooted");
		if (isImage){
			//game.load.image(campusoft.backgroundImage.name, campusoft.backgroundImage.src);
			var loadBackgroundImageStart = function(){
				console.log("Change loadBackgroundImageStart....");
			}
			var loadBackgroundImage = function(){
				console.log("loadBackgroundImage....");
				if (!campusoft.backgroundImageSprite){
					console.log("backgroundImageSprite.NEW....");
					campusoft.backgroundImageSprite = game.add.sprite(0, 0, campusoft.backgroundImage.name);
					
					campusoft.backgroundImageSprite.x = 0;
					campusoft.backgroundImageSprite.y = 0;
					campusoft.backgroundImageSprite.height = game.height;
					campusoft.backgroundImageSprite.width = game.width;
				}else{
					console.log("backgroundImageSprite.Change...."+campusoft.backgroundImage.name);
					campusoft.backgroundImageSprite.loadTexture(
					campusoft.backgroundImage.name);
				}
			}

			game.load.onLoadStart.addOnce(loadBackgroundImageStart, this);
			//game.load.onFileComplete.addOnce(fileComplete, this);
			game.load.onLoadComplete.addOnce(loadBackgroundImage, this);

			game.load.image(campusoft.backgroundImage.name, campusoft.backgroundImage.src);
			game.load.start();
			
		}else{
			game.stage.backgroundColor = campusoft.backgroundColor;
		}
	}
	
	//TODO: DEFINIR SI NO EXISTE
}

var fill2 = function(R,G,B){
	//TODO: VER COMO SOBRECARGAR FUNCIONES 
	campusoft.backgroundColor = campusoft.rgbToHex(R,G,B);	
}

 
var random = function(ele){
	var type = typeof ele;
	if (Array.isArray(ele)) {
	  return Math.floor(Math.random() * ele.length)
	} else if (type == 'number') {
	  return Math.random() * ele;
	}
}



var color = function(name){
	//Verificar color
	if (campusoft.colors[name.toLowerCase()]){
		console.log('backgroundColor: ' + name);
		hex =  campusoft.colorNameToHex(name);
		campusoft.color = hex;
	}
}

var color2 = function(R,G,B){
	//TODO: VER COMO SOBRECARGAR FUNCIONES 
	//campusoft.color = Phaser.Color.RGBtoString(R,G,B,255,'#');
	campusoft.color = campusoft.rgbToHex(R,G,B);	 
}


var circle = function(x, y, diameter){
	
	//TODO: Otros metodos
	//dibujar un circulo de un color que se pasa
	//dibujar un circulo de un color que se pasa, y el color de la linea que se pasa
	
	var _el = new Phaser.Circle(x,y,diameter);
	
	var _obj = new campusoft.geometryObj(_el,campusoft.color);
	
	campusoft.geometryList.push(_obj);

	return _obj
    	
}

var collide = function(sprite1, sprite2, collisionHandler){
  	
	if (!collisionHandler)
		return;
	
	var _obj = new campusoft.collideObj(sprite1,sprite2,collisionHandler);
	campusoft.collideList.push(_obj);
}

 

function preload() {
 	console.log('--Game.State: preload--');
	
	//keep running on losing focus
	game.stage.disableVisibilityChange = true;
	 
	 
	//You can listen for each of these events from Phaser.Loader
    //game.load.onLoadStart.add(loadStart, this);
    //game.load.onFileComplete.add(fileComplete, this);
    //game.load.onLoadComplete.add(loadCompleteGame, this);	
		
	 //	Progress report
    //text = game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });
		
	
	//Background
	if (campusoft.backgroundImage){
		console.log('preload.Apply.BackgroundImage: ' + campusoft.backgroundImage.src);
		game.load.image(campusoft.backgroundImage.name, campusoft.backgroundImage.src);
	}
	
	
 
	//Sprite
	for (index = 0; index < campusoft.spriteList.length; ++index) {
		var spriteObj = campusoft.spriteList[index];
		console.log('Preload.sprite: ' + spriteObj.name);
		
		//TODO: ENCAPSULAR
		game.load.image(spriteObj.name, spriteObj.imageObj.src);
	}
	
	//Audio
	for (index = 0; index < campusoft.soundList.length; ++index) {
		var soundObj = campusoft.soundList[index];
		console.log('Preload.Audio: ' + soundObj.name);
		game.load.audio(soundObj.name, soundObj.soundObj.src); 
	}
	
}


function create(){
	console.log('--Game.State: create--');
	
	//Background
	if (campusoft.backgroundImage){
		console.log('create.Appy.BackgroundImage: '+ campusoft.backgroundImage);
		campusoft.backgroundImageSprite = game.add.sprite(0, 0, campusoft.backgroundImage.name);
		
		//TODO: Revisar
		campusoft.backgroundImageSprite.x = 0;
		campusoft.backgroundImageSprite.y = 0;
		campusoft.backgroundImageSprite.height = game.height;
		campusoft.backgroundImageSprite.width = game.width;
		
	}else{
		console.log('create.Appy.BackgroundColor: '+ campusoft.backgroundColor);
		game.stage.backgroundColor = campusoft.backgroundColor;
	}
	
	
	
	//Sprite 
	for (index = 0; index < campusoft.spriteList.length; ++index) {
		
		var spriteObj = campusoft.spriteList[index];
		spriteObj._CreateSprite();
		
		//TODO: MEJORAR
		//Populate the animation
        for (var i = 0; i < spriteObj.animationValue.length; i++)
        {
			var _ani = spriteObj.animationValue[i];
			//Add tween
			//TODO: FORMA DE EASING ??/
			game.add.tween(spriteObj.wrapper).to(_ani.p, _ani.d, Phaser.Easing.Linear.None, true);
		}
 	}
	
	//text
 	for (index = 0; index < campusoft.textList.length; ++index) {
		var _textObj = campusoft.textList[index];
		var _obj =  game.add.text(_textObj.x, _textObj.y,_textObj.textValue,_textObj.styleValue);
		_textObj.text = _obj;
	}
	
	
	
	//Audio
	for (index = 0; index < campusoft.soundList.length; ++index) {
		var _soundObj = campusoft.soundList[index];
		console.log('create-Audio: ' + _soundObj.name);
		var _obj =  game.add.audio(_soundObj.name); 
		if (_soundObj.playValue){
			console.log("create.play.sonido");
			//todo: Decoded mp3
			//_obj.onDecoded.add(_onDecodedPlaySound, _obj);
			_obj.play();
		}
		_soundObj.audio = _obj;
	}
	
	//TODO: COMO SABER SI SE ACTIVA FISICA O NO?
	//O tener siempre activo ??
	game.physics.startSystem(Phaser.Physics.ARCADE);
	 
	//collide 
	for (index = 0; index < campusoft.collideList.length; ++index) {
		console.log("create.collideList.enablePhysical");
		var _collide = campusoft.collideList[index];   
		 _collide.enablePhysical();
	}
	
	//Group
	for (index = 0; index < campusoft.groupList.length; ++index) {
		var _groupObj = campusoft.groupList[index];
		console.log('create.group');
	   	_groupObj.wrapper =  game.add.group();
		
		//Add child
		var _i;
		for(_i = 0;_i<_groupObj.hash.length;++_i){
			var _child = _groupObj.hash[_i];
			_groupObj.wrapper.add(_child.wrapper);		
		}
	}
	
	
	 //TODO: para que srive preventDefault
	//game.input.touch.preventDefault = false;
	game.input.onTap.add(onTap, this);
	//game.input.onDown.add(onTap, this);
	
	
}

function update() {
	
	//console.info('game.paused: ',game.paused);
	
	if (window.loop && (typeof window.loop == 'function')) {
		//console.info('loop');
		window.loop();
	}

	//collide
	for (index = 0; index < campusoft.collideList.length; ++index) {
		 
		var _collide = campusoft.collideList[index];
		 
		//Run collision
		//TODO.
		game.physics.arcade.overlap(_collide.obj1.wrapper, _collide.obj2.wrapper, _collide.collisionHandler, null, this);
	}
		
}

function render() {
  
	//TODO: Geometry
	for (index = 0; index < campusoft.geometryList.length; ++index) {
		var _geometryObj = campusoft.geometryList[index];
		
		//game.debug.geom(circle,'#cfffff');
 		game.debug.geom(_geometryObj.obj,_geometryObj.color);
	}
	
	for (index = 0; index < campusoft.spriteList.length; ++index) {
		var _spriteObj = campusoft.spriteList[index];
		if (_spriteObj.wrapper){
			//game.debug.spriteInfo(_spriteObj.wrapper, 32, 32);
			
			//game.debug.spriteBounds(_spriteObj.wrapper);
			//game.debug.spriteCorners(_spriteObj.wrapper, true, true);
		}
 	}
}

function onTap(){
 	
	x = game.input.x;
	y = game.input.y;
	if (window.tap && (typeof window.tap == 'function')) {
	 	window.tap();
	}
}