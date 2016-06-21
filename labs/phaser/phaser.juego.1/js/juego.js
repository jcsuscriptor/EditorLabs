var GAME_WIDTH = 640;
var GAME_HEIGHT = 960;
 
var candyGroup;
var candyActual;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload() {
	 
	game.load.spritesheet('candy', 'assets/candy.png', 82, 98);
	
	game.load.image('background', 'assets/background.png');
}

 
function create(){
	// start the physics engine
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	// create new group for candy
	candyGroup = game.add.group();
	
	// set the global gravity
	game.physics.arcade.gravity.y = 200;
		
	
		
	// display images: background, floor and score
	game.add.sprite(0, 0, 'background');
	 
	spawnCandy(game);
	 
}
function removeCandy(candy){
	// kill the candy
	candy.kill();
	
	// decrease player's health
	//Candy._health -= 10;
	// and spawn new candy
	spawnCandy(game);
}

function spawnCandy(game){
	// calculate drop position (from 0 to game width) on the x axis
	var dropPos = Math.floor(Math.random()*GAME_WIDTH);
	// define the offset for every candy
	var dropOffset = [-27,-36,-36,-38,-48];
	// randomize candy type
	var candyType = Math.floor(Math.random()*5);
	// create new candy
	var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
	
	candy.name = 'candy' + Math.floor(Math.random()*100);
	
	// add new animation frame
	candy.animations.add('anim', [candyType], 10, true);
	// play the newly created animation
	candy.animations.play('anim');
	// enable candy body for physic engine
	game.physics.enable(candy, Phaser.Physics.ARCADE);
	
	// enable candy to be clicked/tapped
	candy.inputEnabled = true;
	// add event listener to click/tap
	//candy.events.onInputDown.add(this.clickCandy, this);
	
	// be sure that the candy will fire an event when it goes out of the screen
	candy.checkWorldBounds = true;
	// reset candy when it goes out of screen
	candy.events.onOutOfBounds.add(removeCandy, this);
	// set the anchor (for rotation, position etc) to the middle of the candy
	candy.anchor.setTo(0.5, 0.5);
	// set the random rotation value
	candy.rotateMe = (Math.random()*4)-2;
	
	candyActual = candy;
	// add candy to the group
	//TODO: PROBLEMAS CON EL GRUPO
	//candyGroup.add(candy);
}
	
function update() {
	// loop through all candy on the screen
	/*
	candyGroup.forEach(function(item){
		// to rotate them accordingly
		//item.angle += candy.rotateMe;
		console.info('forEach');
	});
	*/
	candyActual.angle += candyActual.rotateMe;
}
