// Initialize Phaser and creates a game
var game = new Phaser.Game(640, 1136, Phaser.CANVAS, 'gameDiv');

var flappy;

var pipe;
var pipe2;
var score;
var scoreTxt;

// Creates a new 'main' state that will contain the game
var mainState = {

    // Function for loading all assets of the game (called only once)
    preload: function() { 
	
        if(!game.device.desktop){
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            game.scale.setScreenSize(true);
        }else{
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.setScreenSize(true);
        }
		game.load.image('bird','assets/bird.png');
		game.load.image('pipe2','assets/pipe2.png');
		game.load.image('pipe','assets/pipe.png');
    },

    // Fuction called o after 'preload' to setup the game (called only once)
    create: function() {
		game.stage.backgroundColor = '#8888ff';
		
		flappy = game.add.sprite(100,300,'bird');
		
		//create pipe
		pipe2 = game.add.sprite(700,-800,'pipe2');
		pipe = game.add.sprite(700,600,'pipe');
		pipe.passed = false;
		
		//setup the physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		game.physics.arcade.enable(flappy);
		flappy.body.gravity.y = 1000;
		
		game.physics.arcade.enable(pipe);
		game.physics.arcade.enable(pipe2);
		
		//setup input
		game.input.onDown.add(this.jump,this);
		
		score = 0;
		var style = { font: "20px Arial"};
		scoreTxt = game.add.text(300,25,'Score: '+score,style);
    },

    // This function is called 60 times per second
    update: function() {
		
		//Pipe movments
		pipe.body.x = pipe.body.x - 5;
		pipe2.body.x = pipe2.body.x - 5;

		if(flappy.inWorld == false)
			this.restartGame();
			
		if(pipe.body.x + pipe.width < 0){
			pipe.body.x = 700;
			
		}
		
		if(pipe2.body.x + pipe2.width < 0){
			pipe2.body.x = 700;
			pipe.passed = false;
			
			if(Math.round(Math.random() * 100)%2 == 0){
				pipe.y = 600;
				pipe2.y = -800;
			}else{
				pipe.body.y = 800;
				pipe2.body.y = -600; 
				}
			
		}
		
		
		



			
		//if flappy crash
		game.physics.arcade.overlap(flappy,pipe,this.restartGame,null,this);
		game.physics.arcade.overlap(flappy,pipe2,this.restartGame,null,this);
	
	if(flappy.body.x > pipe.body.x + pipe.width && pipe.passed == false){
			++score;
			scoreTxt.setText("Score: "+score);
			pipe.passed = true;	
		}
		

    },
	

		

    jump: function() {

		flappy.body.velocity.y = -500;

    },
	
	restartGame: function() {
		window.open("Untitled-2.html","_self");
		flappy.body.y = 300;

	}

};
//Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main'); 