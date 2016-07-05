var game = new Phaser.Game(800,600, Phaser.AUTO, '', { preload: preload, create: 
create, update: update,  render: render });

var rectangle;

function preload(){
	//game.load.image('pilas', 'assets/pilas.png');
}

function create(){
	
	 //  Create a Rectangle
    rectangle = new Phaser.Rectangle(100, 200, 600, 200);

	 
	 
}

function update(){
	
}

function render(){
	
}

function render () {

    game.debug.geom(rectangle,'#0fffff');

}