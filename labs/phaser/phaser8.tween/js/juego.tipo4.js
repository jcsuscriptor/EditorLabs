var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	game.load.image('pilas', 'assets/pilas.png');
	
	game.load.image('plataforma', 'assets/platform.png');
}

function create(){
	game.stage.backgroundColor = '#2384e7';

	sprite = game.add.sprite(game.world.centerX, -192, 'pilas');
 
	// Set origin to the center to make the rotation look better.
    //sprite.anchor.setTo(0.5, 0.5);
		
	// Add a simple bounce tween  
	game.add.tween(sprite).to( { y: 300 }, 1400, Phaser.Easing.Back.Out, true);
 	 
	 
	plataforma = game.add.sprite(0, 300+sprite.height, 'plataforma');
	 plataforma.width = 800; 
	
}

function update(){
	
}

function render(){
	
}