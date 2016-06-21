var game = new Phaser.Game(720,480,Phaser.CANVAS,"",{preload:onPreload, create:onCreate});

// THE GAME IS PRELOADING
function onPreload() {
	game.load.image("crate", "assets/crate.png");
	game.load.image("diamante", "assets/diamante.png");
}

// THE GAME HAS BEEN CREATED
function onCreate() {
	
	// adding P2 physics to the game
	game.physics.startSystem(Phaser.Physics.P2JS);
	
	// setting gravity
	game.physics.p2.gravity.y = 9.82;
	game.physics.p2.restitution = 0.8;
	
	// creation of physics body and its graphic asset
	box1 = game.add.sprite(100, 50, "crate");
	game.physics.p2.enable(box1);
	box1.body.static = true;
	
	//console.info(box1.body.velocity.y);
	
	box2 = game.add.sprite(300, 50, "crate");
	game.physics.p2.enable(box2);
	box2.body.data.mass = 20;
		
	box3 = game.add.sprite(450, 50, "crate");
	game.physics.p2.enable(box3);
	//box3.body.mass = 0.5;	
	 	
	diamante = game.add.sprite(600, 50, "diamante");
	game.physics.p2.enable(diamante);
	diamante.body.mass = 100;		
		
}
 
 