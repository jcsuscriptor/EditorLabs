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
	//drawRoundedRect(x, y, width, height, radius)
	//radius	Number	
	//Radius of the rectangle corners. In WebGL this must be a value between 0 and 9.
	bar.drawRoundedRect(20, 400, 400, 100,6);
	
	bar.drawRect(600, 200, 100, 100);
	
	bar.beginFill(0xff0000);
    bar.drawCircle(300, 200, 50);
	
	bar.beginFill(0x00ff00);
    bar.drawEllipse(200, 200, 50,100);   
	
	//lineStyle(lineWidth, color, alpha) → {PIXI.Graphics}
	//moveTo(x, y) → {PIXI.Graphics}
	//lineTo(x, y) → {PIXI.Graphics}
	bar.lineStyle(5, 0xff00ff)
	bar.moveTo(30,30);
	bar.lineTo(300,300);
	
	//arc(cx, cy, radius, startAngle, endAngle, anticlockwise) → {PIXI.Graphics}
	//The arc method creates an arc/curve (used to create circles, or parts of circles).
	// graphics.arc(0, 0, 135, game.math.degToRad(0), game.math.degToRad(90), false);
    //graphics.arc(0, 0, 135, 0, 1.5707963267948966, false);
	bar.arc(300,400,60,0,10)
	
	bar.drawCircle(500, 300, 80);
	
	//drawPolygon
	 
	 
}

function update(){
	
}

function render(){
	
}