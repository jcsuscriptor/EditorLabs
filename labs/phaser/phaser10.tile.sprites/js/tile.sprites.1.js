var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	game.load.image('space', 'assets/thalion-rain.png');
}
var bg;

function create(){
	
	  bg = game.add.tileSprite(0, 0, 800, 600, 'space');
	 
	 
}

function update(){
	 bg.tilePosition.y += 0.4;
}

function render(){
	
}