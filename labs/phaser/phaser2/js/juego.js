var game = new Phaser.Game(800 , 600 , Phaser.AUTO , "" , {preload: preload, create: create, update: update});
// new Phaser.Game(ancho , alto , CANVAS - WEBGL (AUTO=CANVAS) ,"",{preload: preload, create: create, update: update} )

function preload(){
   //Esta es una funcion que se utiliza para cargar los elementos que seran parte del juego .
	game.load.image('star', 'assets/star.png');
   
   cursors = game.input.keyboard.createCursorKeys();
}
function create(){
    // Funcion que la que crea las condiciones de juego iniciales
	star = game.add.sprite(game.world.width/2, game.world.height/2, 'star');
	
     game.physics.arcade.enable(star);
	 
	 // El objeto puede chocar con los bordes.
	 star.body.collideWorldBounds = true;

}
function update(){
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