var GAME_WIDTH = 640;
var GAME_HEIGHT = 960;
 
var candyGroup;
var candyActual;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload() {
	
	game.load.image('giraffe', 'assets/giraffe.png');
	game.load.image('monkey', 'assets/monkey.png');
	game.load.image('pig', 'assets/pig.png');
}

 
function create(){
	// start the physics engine
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	giraffe = game.add.sprite(100, 50, 'giraffe'); 
	giraffe.scale.setTo(0.5,0.5);
	giraffe.name = "giraffe";
	game.physics.arcade.enable(giraffe);
	
	monkey = game.add.sprite(100, 250, 'monkey');
	monkey.scale.setTo(0.5,0.5);
	monkey.name = "monkey";
	game.physics.arcade.enable(monkey);
	
	pig = game.add.sprite(100, 400, 'pig'); 
	pig.scale.setTo(0.5,0.5);
	pig.name = "pig";
	game.physics.arcade.enable(pig);
	
	giraffeCopy = game.add.sprite(350, 50, 'giraffe'); 
	giraffeCopy.scale.setTo(0.5,0.5);
	giraffeCopy.inputEnabled = true;
    giraffeCopy.input.enableDrag();
	giraffeCopy.name = "giraffe";
	game.physics.arcade.enable(giraffeCopy);
	
	//save position
	giraffeCopy.originalPosition = giraffeCopy.position.clone();
    giraffeCopy.events.onDragStop.add(function(currentSprite){
      stopDrag(currentSprite, giraffe);
    }, this);
	
	
	monkeyCopy = game.add.sprite(350, 250, 'monkey'); 
	monkeyCopy.scale.setTo(0.5,0.5);
	monkeyCopy.inputEnabled = true;
    monkeyCopy.input.enableDrag();
	monkeyCopy.name = "monkey";
	game.physics.arcade.enable(monkeyCopy);
	
	//save position
	monkeyCopy.originalPosition = monkeyCopy.position.clone();
    monkeyCopy.events.onDragStop.add(function(currentSprite){
      stopDrag(currentSprite, monkey);
    }, this);
	 
	
	pigCopy = game.add.sprite(350, 400, 'pig'); 
	pigCopy.scale.setTo(0.5,0.5);
	pigCopy.inputEnabled = true;
    pigCopy.input.enableDrag();
	pigCopy.name = "pig";
	game.physics.arcade.enable(pigCopy);
	
	//save position
	pigCopy.originalPosition = pigCopy.position.clone();
    pigCopy.events.onDragStop.add(function(currentSprite){
      stopDrag(currentSprite, pig);
    }, this);	
	 
}

function stopDrag(currentSprite, endSprite){
	if (game.physics.arcade.overlap(currentSprite, endSprite)){

		currentSprite.input.draggable = false;
		currentSprite.position.copyFrom(endSprite.position); 
		currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
		
	}else{
		currentSprite.position.copyFrom(currentSprite.originalPosition);
	}
}
 
function update() {
	 
}
