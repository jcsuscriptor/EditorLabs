var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

function preload(){
	//game.load.image('pilas', 'assets/pilas.png');
}

function create(){
	
	//beginFill
	//lineStyle
	
	
	//game.stage.backgroundColor  = 0xffffff;
	var bar = game.add.graphics();
    bar.beginFill(0x0000ff);
    bar.drawRect(20, 20, 400, 100);
	 
	game.add.tween(bar).to( { alpha: 0.5 }, 2000, "Linear", true);
	
	var cir = game.add.graphics();
	cir.beginFill(0xff0000);
    cir.drawCircle(300, 200, 50);
	
	game.add.tween(cir).to( { x: 100}, 2000, "Linear", true);
}

function update(){
	
}

function render(){
	
}