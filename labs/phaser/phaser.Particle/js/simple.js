var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
 
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var particulas;

function preload() {
	game.load.image('cube', 'assets/cube.png');
}

 
function create(){
	//Fisica
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = 0x114799;
	
	//particulas
	//x, y, maxParticles	
    particulas = game.add.emitter(0, 0, 100);
    particulas.makeParticles('cube');
	particulas.gravity = 200;
	game.input.onDown.add(genera, this);
}


function genera(punto) {
    particulas.x = punto.x;
    particulas.y = punto.y;
	//1. si es "true" todas la particulas seran lanzadas de una vez de lo contrario una por una.
	// El segundo le da a cada particula una vida util 2000ms
	// La tercera se ignora cuando se utiliza el modo de rafaga / explotar
	// El parametro final (10) es el numero de particulas se emite en esta sola rafaga
    particulas.start(true, 2000, null, 10);
};

function update(){
	
}