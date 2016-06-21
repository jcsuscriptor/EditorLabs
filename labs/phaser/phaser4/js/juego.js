// new Phaser.Game(ancho , alto , CANVAS - WEBGL (AUTO=CANVAS) ,"",{preload: preload, create: create, update: update} )
var game = new Phaser.Game(800 , 320 , Phaser.AUTO , "" , {preload: preload, create: create, update: update, render: render});

function preload(){
   
    //  150x168 is the size of each frame

    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    game.load.spritesheet('player', 'assets/yoda.png', 32, 48);
		
  
}

var player;

function create(){
	
	player = game.add.sprite(0, 0, 'player');
	//  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    //player.body.bounce.y = 0.2;
    //player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	
	//You can see 12 frames in total
	
	//  Our two animations, walking left and right.
	//The 'left' animation uses frames 5, 6, 7, 8  and runs at 5 frames per second.
    player.animations.add('down', [0, 1, 2, 3], 5, true);
	
	player.animations.add('left', [4, 5, 6, 7], 5, true);
	
    player.animations.add('right', [8, 9, 10, 11], 5, true);
	
	player.animations.add('right', [8, 9, 10, 11], 5, true);
	
	player.animations.add('up', [12, 13, 14, 15], 5, true);
	
 
	 
	
	cursors = game.input.keyboard.createCursorKeys();


	 
}

function onUpdate(anim, frame) {

    //text.text = 'Frame ' + frame.index;

}

function render() {
	 
}

function update(){
	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;
	 player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
	else if (cursors.up.isDown){
		//  Move to the right
        player.body.velocity.y = -150;
		player.animations.play('up');
	}
	else if (cursors.down.isDown){
		//  Move to the right
        player.body.velocity.y = 150;
		player.animations.play('down');
	}
    else
    {
        //  Stand still
        player.animations.stop();

       // player.frame = 5;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
	   
}