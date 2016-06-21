var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	game.load.image('pilas', 'assets/pilas.png');
}

function create(){
	game.stage.backgroundColor = '#2384e7';
	sprite = game.add.sprite(game.world.centerX, 0, 'pilas');

	game.add.tween(sprite).to( { x: 0 }, 2000, Phaser.Easing.Linear.None, true);
	
	sprite2 = game.add.sprite(game.world.centerX, 100, 'pilas');

	game.add.tween(sprite2).to( { x: 0 }, 2000, Phaser.Easing.Back.In, true);
	
	sprite3 = game.add.sprite(game.world.centerX, 200, 'pilas');
	
	game.add.tween(sprite3).to( { x: 0 }, 2000, Phaser.Easing.Bounce.In, true);
	
	sprite4 = game.add.sprite(game.world.centerX, 300, 'pilas');
	
	game.add.tween(sprite4).to( { x: 0 }, 2000, Phaser.Easing.Circular.In, true);
	
	sprite5 = game.add.sprite(game.world.centerX, 400, 'pilas');
	
	game.add.tween(sprite5).to( { x: 0 }, 2000, Phaser.Easing.Cubic.In, true);
	
}

function update(){
	
}

function render(){
	
}