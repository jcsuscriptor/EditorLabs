game = new Phaser.Game(320,480, Phaser.AUTO, "", { preload: preload, create: 
create, update: update,  render: render });
 
var shipHorizontalSpeed = 400;
var shipMoveDelay = 500;
var shipCanMove;

var barrierSpeed = 120;
var barrierDelay = 1000;// 2000;
 
function preload() {
	 game.load.image("ship", "assets/ship.png");
	 game.load.image("barrier", "assets/barrier.png");
}

function create() {	
	shipCanMove = true;
	
	//Start Physics 
	game.physics.startSystem(Phaser.Physics.ARCADE);

	console.info(game.width +' '+ game.height);
	shipPosition = 0;
    shipPositions = [40, game.width - 40];
	
	//Position initial
	ship = game.add.sprite(shipPositions[shipPosition], game.height - 40, "ship");
	
	ship.anchor.set(0.5);
	
	game.physics.enable(ship, Phaser.Physics.ARCADE);
	
	game.time.events.loop(barrierDelay, function(){
		   var barrier = new Barrier(game);
		   game.add.existing(barrier);
		   //barrierGroup.add(barrier);
		   //console.log(barrierGroup);
    });   
		  
	game.input.onDown.add(moveShip);
}

function update() {	
}

function render() {	
}


function moveShip(){
     if(shipCanMove){
          shipPosition = 1 - shipPosition;
		  console.info('shipPosition:'+ shipPosition);
          //shipCanMove = false;
          
		  var moveTween = game.add.tween(ship).to({ 
               x: shipPositions[shipPosition],
          }, shipHorizontalSpeed, Phaser.Easing.Linear.None, true);
         
     }
}


Barrier = function (game) {
     var position = game.rnd.between(0, 1);
	 Phaser.Sprite.call(this, game, game.width * position, -20, "barrier");
	 game.physics.enable(this, Phaser.Physics.ARCADE);
     this.anchor.set(0.5);
};

Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

Barrier.prototype.update = function() {
	this.body.velocity.y = barrierSpeed;
	//console.info('Barrier.update:'+this.body.velocity.y);
	if(this.y > game.height){
		this.destroy();
	}
};