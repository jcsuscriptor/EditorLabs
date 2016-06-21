var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

var sprite3;

function preload(){
	game.load.image('pilas', 'assets/pilas.png');
	
	game.load.image('plataforma', 'assets/platform.png');
}

function create(){
	game.stage.backgroundColor = '#2384e7';

	sprite = game.add.sprite(250, -192, 'pilas');
 
	// Set origin to the center to make the rotation look better.
    //sprite.anchor.setTo(0.5, 0.5);
		
	// Add a simple bounce tween  
	game.add.tween(sprite).to( { y: 300 }, 1800, Phaser.Easing.Cubic.Out, true);
 	

	
	 
	plataforma = game.add.sprite(0, 300-10+sprite.height, 'plataforma');
	plataforma.width = 800; 

	
	sprite2 = game.add.sprite(100, 300-10, 'pilas');
	sprite2.anchor.setTo(0.5, 0.5);
 
 
// Add another rotation tween to the same character.
    game.add.tween(sprite2).to({angle: 360}, 1800, Phaser.Easing.Cubic.In, true);
	//, 1000 + 400 * i, false);
	
	sprite3 = game.add.sprite(600, 0, 'pilas');
	sprite3.anchor.setTo(1, 1);
	
	//Rotar sobre una distancia en un ejes
	sprite3.pivot.x = -40;
	
	game.add.tween(sprite3).to( { y: 500 }, 1800, Phaser.Easing.Linear.None)
						   .to( { angle: 90 }, 500, Phaser.Easing.Bounce.Out).start();
	
}

function update(){
	
}

function render() {

    // Display
    //game.debug.spriteBounds(sprite3);
    //game.debug.spriteCorners(sprite3, true, true);

}