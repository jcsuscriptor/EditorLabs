var game = new Phaser.Game(800 , 320 , Phaser.AUTO , "" , {preload: preload, create: create, update: update});
// new Phaser.Game(ancho , alto , CANVAS - WEBGL (AUTO=CANVAS) ,"",{preload: preload, create: create, update: update} )

function preload(){
   //Esta es una funcion que se utiliza para cargar los elementos que seran parte del juego .
	game.load.image('star', 'assets/star.png');
   
    //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
    //  This could be Phaser.Tilemap.CSV too.
    game.load.tilemap('MyTilemap', 'assets/mapa.json', null, Phaser.Tilemap.TILED_JSON);
	//  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
    game.load.image('tiles', 'assets/rock.png');
	
	//game.load.tileset('tiles', 'assets/tilesets/tiles_spritesheet.png', cfg.TILE_WIDTH, cfg.TILE_HEIGHT);
		
  
}
function create(){
	
 	
     // Funcion que la que crea las condiciones de juego iniciales
	 star = game.add.sprite(32, 32, 'star');
	 game.physics.enable(star, Phaser.Physics.ARCADE);
  	 
     game.physics.arcade.gravity.y = 250;
	 
	 // El objeto puede chocar con los bordes.
	 star.body.collideWorldBounds = true;
	 game.camera.follow(star);
	 
	 cursors = game.input.keyboard.createCursorKeys();
	 
	 
	 //  The 'MyTilemap' key here is the Loader key given in game.load.tilemap
	 map = game.add.tilemap('MyTilemap');
	 
	 
	 
	 //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
     //  The second parameter maps this name to the Phaser.Cache key 'tiles'
	 map.addTilesetImage('rock', 'tiles');
	 
	  
	
	 //  Creates a layer from the "fondo" layer in the map data.
     //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
     layer = map.createLayer('fondo');
	 
	 //  This resizes the game world to match the layer dimensions
	 layer.resizeWorld();
	 
	 layer.debug = true;
	 
	 //  This isn't totally accurate, but it'll do for now
    // map.setCollisionBetween(0,1);
	 map.setCollisionByExclusion([34], true);



}
function update(){
	
	game.physics.arcade.collide(star,layer);
	
  // Funcion que actualiza los cambios en algun elemento 
	if(cursors.left.isDown)
		  star.body.velocity.x = -250;
	if(cursors.right.isDown)
		  star.body.velocity.x = +250;
	if(cursors.up.isDown)
		  star.body.velocity.y = -150;
	if(cursors.down.isDown)
		  star.body.velocity.y = +150;
	// start.body.velocity.eje Significa que afectaremos al objeto con una velocidad en algun eje, recordar que en el anterior articulo hicimos que el objeto start pueda ser afectado por condiciones fisicas game.physics.arcade.enable(star);
}