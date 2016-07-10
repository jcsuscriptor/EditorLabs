var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	game.load.image('pilas', 'assets/pilas.png');
	game.load.image('plataforma', 'assets/platform.png');
}

function create(){
	game.stage.backgroundColor = '#2384e7';

	var bar = game.add.graphics(500,100);
	console.log(bar.width);
	console.log(bar.world);
    bar.beginFill(0x0000ff);
    var circulo1 = bar.drawCircle(0,0,100);
	//circulo1.x = 500;
	//circulo1.y = 100;
	console.log(circulo1.x);
	console.log(circulo1.y);

	var bar2 = game.add.graphics(300, 200);
	console.log(bar2.width);
	console.log(bar2.world);
	bar2.beginFill(0x00ff00);
	var circulo2 = bar2.drawCircle(0, 0,100);
	//circulo2.x = 300;
	//circulo2.y = 200;

	var bar3 = game.add.graphics(0,300);
	bar3.beginFill(0xff0000);
	var circulo3 = bar3.drawCircle(0, 0,100);
	//circulo3.x =0;
	//circulo3.y =300;
	console.log(circulo3.x);
	console.log(circulo3.y);

  	game.add.tween(circulo1).to( { x: 300,y:200 }).start();
	game.add.tween(circulo2).to( { x: 300,y:200 }).start();
	game.add.tween(circulo3).to( { x: 300,y:200 }).start();
	//game.add.tween(bar2).to( { x: 200 }).start();
}

function update(){
	
}

function render(){
	
}