var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
 
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create });

var particulas;

function preload() {
	game.load.image('cube', 'assets/cube.png');
	game.load.image('aceituna', 'assets/aceituna_burla.png');
	game.load.image('diamante', 'assets/diamante.png');
	
}

 
function create(){
	
	game.stage.backgroundColor = 0x337799;
	emitter = game.add.emitter(game.world.centerX, 200, 200);
	
	//  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
    emitter.makeParticles(['cube', 'aceituna', 'diamante']);

	game.input.onDown.add(genera, this);
    
}


function genera(punto) {
    emitter.x = punto.x;
    emitter.y = punto.y;
	//1. si es "true" todas la particulas seran lanzadas de una vez de lo contrario una por una.
    emitter.start(true, 5000, null, 20);
};