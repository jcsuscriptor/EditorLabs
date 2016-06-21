Game = {};

var w = 600;
var h = 500;
var death = 0;


var game = new Phaser.Game(w, h, Phaser.AUTO, '');

Game.Load = function (game) {

};

Game.Load.prototype = {
	preload: function () {
	    game.stage.backgroundColor = '#9b59b6';
		game.load.image('player', 'assets/player.png');
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
 Game.Play = function (game) {};

Game.Play.prototype = {

	create: function () {
		//Start Physics 
		this.player = this.game.add.sprite(80, h/2, 'player');

		this.player.angle = 0;
		this.player.anchor.setTo(0.5, 0.5);
		
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
 
	},
	
	update: function() {
		game.physics.arcade.collide(this.player, this.line);
		//game.physics.p2.collide(this.player, this.line);

	    if (this.spaceKey.isDown) {
			 this.rotation = this.game.add.tween(this.player).to(
			{angle: this.player.angle + 180}, 1700, Phaser.Easing.Linear.None);
			this.rotation.start();

		}
	}

 
	 
};	



game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
//game.state.add('End', Game.End);

game.state.start('Load');
