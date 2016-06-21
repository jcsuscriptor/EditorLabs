var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	game.load.image('pilas', 'assets/pilas.png');
	
	game.load.image('plataforma', 'assets/platform.png');
}

function create(){
	game.stage.backgroundColor = '#2384e7';

	sprite = game.add.sprite(game.world.centerX, 0, 'pilas');
 		
	// Add a simple bounce tween  
	game.add.tween(sprite).from( { y: 450 }, 2400, Phaser.Easing.Bounce.Out, true);
 	 	
}

function update(){
	
}

function render(){
	
}