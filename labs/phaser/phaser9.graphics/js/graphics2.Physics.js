var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	//game.load.image('pilas', 'assets/pilas.png');
}

function create(){
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	 //  Set the world (global) gravity
    game.physics.arcade.gravity.y = 100;
	
	//game.stage.backgroundColor  = 0xffffff;
	var bar = game.add.graphics();
    bar.beginFill(0x0000ff);
    var rect = bar.drawRect(20, 20, 400, 100);
 	 
	
	var cir = game.add.graphics();
	cir.beginFill(0xff0000);
    cir.drawCircle(300, 200, 50);
	
	//No funciona
	//game.physics.enable(cir, Phaser.Physics.ARCADE);
}

function update(){
	
}

function render(){
	
}