/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function () {};
game_state.main.prototype = {


	preload: function(){
	    game.load.image('sky', 'assets/sky.png');
	    
	    game.load.image('ground','assets/platform.png');
	    
	    game.load.image('star','assets/star.png');
	    
	    game.load.spritesheet('fakboi','assets/fakboi.png',150,102);
	

},


create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
	
		game.add.sprite(0,0,'star');
		
		game.add.sprite(0,0,'sky');
		
		this.platforms = game.add.group();
		
		this.platforms.enableBody = true;
		
		var ground = this.platforms.create(0, game.world.height - 64, 'ground');
		
		ground.scale.setTo(2, 2);
		
		ground.body.immovable = true;
		
		var ledge = this.platforms.create(169, 100, 'ground' )
		
		ledge.body.immovable = true;
		
		
		
		this.player = game.add.sprite(50, game.world.height -150, 'fakboi');
		
		game.physics.arcade.enable(this.player);
		
		this.player.body.bounce.y = 0.2;
		
		this.player.body.gravity.y = 400;
		
		this.player.body.setSize(49,39,53,32)
		
		this.player.body.collideWorldBounds = true;
		
		this.player.animations.add('left');
		
		this.player.animations.add('right');
		
		this.cursors = game.input.keyboard.createCursorKeys();
		
		
		this.stars = game.add.group();
		
		this.stars.enableBody = true;
		
		for (var i = 0; i < 12; i++) {
			
			var star = this.stars.create(1 * 70, 0, 'star');
			
			star.body.gravity.y = 300;
			
			star.body.bounce.y - 0.7 + Math.random() * 0.2;
		}
		
		
		this.scoreText = game.add.text(16, 16, 'score: 0', {
			
			fontSize: '32px',
			
			fill: '#000'
		});



},


update: function() {
		game.physics.arcade.collide(this.player, this.platforms);
		
		this.player.body.velocity.x = 0;
		
		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -150;
		}
		
		else if (this.cursors.right.isDown){
				 this.player.body.velocity.x = 150;
		}
		else{
			this.player.animations.stop();
			//this.player.frame = ;
		}
		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -350;
		}
		game.physics.arcade.collide(this.stars, this.platforms);
		
		game.physics.collide.overlap(this.player, this.stars, this.collectStar, null, this);
		//game.debug.body(this.player);
},

collectStar: function(player, star) {
	
	star.kill();
	
	//scoreText.text = "Score:" + this.score;
}

}
game.state.add('main', game_state.main);

game.state.start('main');