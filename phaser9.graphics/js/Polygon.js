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
    bar.drawPolygon(10,200,300,300,200,50,10,10);
}

function update(){
	
}

function render(){
	
}