var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	game.load.image('pilas', 'assets/pilas.png');
}

function create(){
	game.stage.backgroundColor = '#2384e7';
	sprite = game.add.sprite(game.world.width, 0, 'pilas');
	sprite.x = game.world.width-sprite.width;
	secuencia = game.add.tween(sprite).to({ x: 0 }, 2000, Phaser.Easing.Linear.None)
	 .to({ y: game.world.height-sprite.height }, 1000, Phaser.Easing.Bounce.Out)

	 .to({ x: game.world.width-sprite.width }, 1000, Phaser.Easing.Cubic.Out)

	 .to({ y: 0 }, 1000, Phaser.Easing.Back.Out)

	 .loop()
	.start();	
	 
}

function update(){
	
}

function render(){
	
}