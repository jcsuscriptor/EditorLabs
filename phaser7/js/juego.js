Game = {};

var w = 600;
var h = 500;
var death = 0;


var game = new Phaser.Game(w, h, Phaser.AUTO, '');






function rand(num){ return Math.floor(Math.random() * num) };


Game.Load = function (game) {

};

Game.Load.prototype = {
	preload: function () {
	    game.stage.backgroundColor = '#9b59b6';
	    
		game.load.image('player', 'assets/player.png');
		game.load.image('line', 'assets/line.png');
	},
	create: function () {
		game.state.start('Play');
	}
};


/*
  Programming and art made by www.lessmilk.com
  You can freely look at the code below, 
  but you are not allowed to use the code or art to make your own games
*/

var map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

	[0, 0, 5, 5, 5, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3],
	[0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0],
	[0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],

	[0, 0, 5, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2],
	[0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 2, 2, 2, 0, 0, 5],
	[0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 5, 5, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 2],
	[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],

	[0, 0, 0, 0, 4, 0, 0, 0, 0, 5, 0, 0, 0, 3, 3, 0, 0, 0, 0, 5, 0, 0],
	[0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 0, 0, 0, 0, 5, 5, 0, 0, 0, 4, 0, 0],
	[0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 4, 1],
	[0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 2, 0, 0]];
	
Game.Play = function (game) {};

Game.Play.prototype = {

	create: function () {
		//Start Physics 
		this.physics.startSystem(Phaser.Physics.ARCADE);
		//	Enable p2 physics
		//this.physics.startSystem(Phaser.Physics.P2JS);


		this.player = this.game.add.sprite(80, h*2/3-20, 'player');
		
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		//this.physics.enable(this.player, Phaser.Physics.P2JS);

		this.player.angle = 0;
		//this.player.body.bounce.y = 0;
    	this.player.anchor.setTo(0.5, 0.5);
		
		 //  Tell it we don't want physics to manage the rotation
		//this.player.body.allowRotation = false;
		
		this.line = this.game.add.sprite(w/2, Math.floor(h*2/3), 'line');
		this.line.anchor.setTo(0.5, 0.5);
		
		this.physics.enable(this.line, Phaser.Physics.ARCADE);
		//this.physics.enable(this.line, Phaser.Physics.P2JS);
		
		
		this.line.body.immovable = true;

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.level = 0; 
	    this.start = 0;
	},
	
	render : function () {
		game.debug.spriteInfo(this.player, 32, 32);
	},

	update: function() {
		game.physics.arcade.collide(this.player, this.line);
		//game.physics.p2.collide(this.player, this.line);
		
		//console.info('this.player.body.touching.down:'+this.player.body.touching.down)
	    if (this.spaceKey.isDown && this.player.body.touching.down) {
	        this.playerJump();
	        if (this.start == 0) {
	        	this.start = 1;
	        	this.player.body.velocity.x = 200;
	        	//game.add.audio('music').play('', 0, 0.1, true);
	        }
	    }

	    if (this.player.body.touching.down && this.start == 1) { 
	    	this.player.alive = true;
	    	this.player.body.velocity.x = 200;
	    }


	    
		this.player.body.gravity.y = 360;
		

		
	},

	playerJump: function() {
		this.player.body.velocity.y = -160;
        //this.jump_s.play('', 0, 0.1);
        this.rotation = this.game.add.tween(this.player).to(
		{angle: this.player.angle + 90}, 700, Phaser.Easing.Linear.None);
        this.rotation.start();
	},

	 
};	



game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
//game.state.add('End', Game.End);

game.state.start('Load');
