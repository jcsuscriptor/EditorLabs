var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	game.load.image('pilas', 'assets/pilas.png');
	game.load.image('plataforma', 'assets/platform.png');
}

function create(){
	game.stage.backgroundColor = '#2384e7';

	sprite = game.add.sprite(100, 200, 'pilas');
	sprite2 = game.add.sprite(400, 200, 'pilas');
 
  	game.add.tween(sprite).to( { x: 300 }).start();
	game.add.tween(sprite2).to( { x: 300 }).start();
	
}

function update(){
	
}

function render(){
	
}