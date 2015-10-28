/* TODO:
* ======================================================
* [x] Create basic prototype....................(06/27)
* [x] Add player animations.....................(06/28) 
* [x] Add Cat death animations..................(06/30)	
* [x] Optimize for Mobile.......................(06/30)
* [x] Add touch-start to menu & death...........(06/30) 
* [x] Test on Mobile............................(07/01)
* [x] Add the shooting animation................(06/30)
* [x] Add a start and death screen..............(06/30)
* [x] Change size of Mobile buttons.............(07/01)
* [x] Change color of Cat bullets...............(07/01)
* [x] Add custom font...........................(07/01)
* [x] Add level transition screen...............(07/01)
* [x] Add various 'levels'......................(07/01)
* [x] Add a high score..........................(06/30)
* [x] Add incrementally sized groups............(07/02)
* [x] Increase difficulty with each stage.......(07/02)
* [x] Store high-score permenantly..............(07/02)
* [x] Change "Level" to "wave" on death.........(07/03)
* [x] Tint player red when hit..................(07/04)
* [x] Increase enemy bullet size................(07/04)
* [x] Add vibrate to hit/death..................(07/05)
* [x] Add 'input' screen to mobile..............(07/04)
* [x] Add difficulty system.....................(07/06)
* [x] Add Gameover screen and flashing text.....(07/09)
* [ ] Add additional cat images
* [ ] Add achievement system?
* [ ] Add sound effects (music?)
*
* BUGS TO FIX:
* ======================================================
* [x] Odd origin for Cat bullets................(07/01)
* [x] Fix issue with buttons not showing........(07/01)
* [x] Fix issue with movement if not touching...(07/01)
* [x] Fix scaling issues in CocoonJS............(07/01)
* [x] Fix run-and-gun issue.....................(07/02)
* [x] Fix webview fps issues....................(07/02)
* [ ] Fix canvas rendering issues
* [x] Change this.player.y......................(07/02)
* [x] Implement better mobile button size.......(07/02)
*/

var playState = {
    
    create: function() {        
		this.player;
		this.cats;
		this.bullets;
		this.bulletTime = 0;
		this.cursors;
		this.deaths;
		this.fireButton;
		this.scoreString = '';
		this.scoreText;
		this.enemyBullet;
		this.firingTimer = 0;
		this.stateText;
		this.livingEnemies = []; 
		this.event_time = 0;
		this.scale = 2.5;
		this.rows = this.getRandom(2, 4);
		this.columns = 8;
        
        
        // Define Sounds        
        this.meow1 = game.add.audio('meow1');
        this.meow2 = game.add.audio('meow2');
        this.player_hit = game.add.audio('player_hit');
        this.player_die = game.add.audio('player_die');
        this.lazer = game.add.audio('lazer');
        this.lazer.volume = 0.5;
        this.shot = game.add.audio('shot');
        this.shot.volume = 0.5;
        
        // Duration of vibration for mobile
        this.vibdur = 100;
        
        this.background = game.add.sprite(0, 0, 'background');
 
		//  Player's bullet group
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30, 'bullet');
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 1);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);

		// The cat's bullet group
		this.enemyBullets = game.add.group();
		this.enemyBullets.enableBody = true;
		this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.enemyBullets.createMultiple(30, 'catBullet');
		this.enemyBullets.setAll('anchor.x', 0.5);
		this.enemyBullets.setAll('anchor.y', 1);
		this.enemyBullets.setAll('outOfBoundsKill', true);
		this.enemyBullets.setAll('checkWorldBounds', true);
        
        // Create the player
		this.player = game.add.sprite(400, 335, 'hero');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.collideWorldBounds = true;
		this.player.scale.x = this.scale;
		this.player.scale.y = this.scale;
		this.player.animations.add('left', [4, 5], 10, true);
		this.player.animations.add('right', [6, 7], 10, true);

		// Creating the cats group
		this.cats = game.add.group();
		this.cats.enableBody = true;
		this.cats.physicsBodyType = Phaser.Physics.ARCADE;        
		
	    this.createCats();
	    
        // Enable mobile input if not playing on a desktop
	    if (!game.device.desktop) {
			this.addMobileInputs();
		}
	   
		//  The score
		this.scoreString = 'Score : ';
		this.scoreText = game.add.text(10, 10, this.scoreString + game.global.score, { font: '18px Lucida Console', fill: '#fff' });	   
		
		//  Lives
		this.lives = game.add.group();
		game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '18px Lucida Console', fill: '#fff' });

		//  Text
		this.stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '34px Lucida Console', fill: '#fff' });
		this.stateText.anchor.setTo(0.5, 0.5);
		this.stateText.visible = false;		

		for (var i = 0; i < game.global.lives; i++) {
			var life = this.lives.create(game.world.width - 100 + (30 * i), 60, 'life');
			life.anchor.setTo(0.5, 0.5);
			life.alpha = 0.75;
		}
		
		this.deaths = game.add.group();
		this.deaths.createMultiple(30, 'cat');
		this.deaths.scale.x = 2.5;
		this.deaths.scale.y = 2.5;
		this.deaths.forEach(this.setupCats, this);
    		
		//  And some controls to play the game with
		this.cursors = game.input.keyboard.createCursorKeys();
		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
    },
    
    update: function() {

		game.physics.arcade.overlap(this.bullets, this.cats, this.collisionHandler, null, this);
		game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(this.player, this.cats, this.playerDie, null, this);
        
		this.movePlayer();
        
	},

    getRandom: function(min, max) {
		// This is used for randomization
        return Math.floor(Math.random() * (max - min)) + min;    
    },
    
	movePlayer: function() {
		//  Reset the player, then check for movement keys
		this.player.body.velocity.setTo(0, 0);

		if (this.cursors.left.isDown || this.moveLeft) {
			this.player.body.velocity.x = -200;
			this.player.animations.play('left');
		} else if (this.cursors.right.isDown || this.moveRight) {
			this.player.body.velocity.x = 200;
			this.player.animations.play('right');
		} else if (this.fireButton.isDown) {
			this.fireBullet();	
		} else {
			this.player.body.velocity.x = 0;
			this.player.animations.stop();
			this.player.frame = 3;
		}

		
		/*if (this.fireButton.isDown) {
			this.fireBullet();
		}*/ 
		
		if (game.time.now > this.firingTimer) {
			this.enemyFires();
		}	
	},

	addMobileInputs: function() {
		
		var y = 0; //game.world.height - 64;
		
		// Add the shoot button
		this.shootButton = game.add.sprite(game.world.width - 200, y, 'shootButton');
		this.shootButton.inputEnabled = true;
		this.shootButton.alpha = 0.5;
		
		// Movement variables
		this.moveLeft = false;
		this.moveRight = false;
		
		//Add the move left button
		this.leftButton = game.add.sprite(0, y, 'leftButton');
		this.leftButton.inputEnabled = true;
		this.leftButton.events.onInputDown.add(function(){this.moveLeft=true;}, this);
		this.leftButton.events.onInputUp.add(function(){this.moveLeft=false;}, this);		
		this.leftButton.alpha = 0.5;
		
		// add the move right button
		this.rightButton = game.add.sprite(80, y, 'rightButton');
		this.rightButton.inputEnabled = true;
		this.rightButton.events.onInputDown.add(function(){this.moveRight=true;}, this);
		this.rightButton.events.onInputUp.add(function(){this.moveRight=false;}, this);   
		this.rightButton.alpha = 0.5;
		
		// Call 'shoot' when the shootButton is pressed
		this.shootButton.events.onInputDown.add(this.fireBullet, this);
	
	},

	setupCats: function(invader) {

		invader.anchor.x = 0.5;
		invader.anchor.y = 0.5;
		invader.animations.add('cat');

	},
	
	createCats: function() {

		for (var y = 0; y < this.rows; y++) {
			for (var x = 0; x < this.columns; x++) {
                if (y == 0) {
                    this.cat = this.cats.create(x * 48, y * 50, 'cat3');
                } else if (y == 1) {
                    this.cat = this.cats.create(x * 48, y * 50, 'cat2');
                } else {
				    this.cat = this.cats.create(x * 48, y * 50, 'cat');
                }
                
				this.cat.scale.x = this.scale;
				this.cat.scale.y = this.scale;
				this.cat.anchor.setTo(0.5, 0.5);
				this.cat.body.moves = false;				
			}
		}
        
 		this.cats.x = 32;
		this.cats.y = 50;       
        
        var mult;
        
        // Setting Speed per difficulty level
        if (game.global.difficulty == "easy") {
            mult = 35;
        } else if (game.global.difficulty == "med") {
            mult = 25;   
        } else {
            mult = 15;   
        }
        
        // Customizing the speed per level
        var l = game.global.level;
        var start = 3000;
        if (l == 1) {
            var speed = start;
        } else {
            var speed = start - (start * ((l-1) / mult));
        }

		
		// Getting the cats moving.
		this.tween = game.add.tween(this.cats).to( { x: 200 }, speed, Phaser.Easing.Linear.None, true, 0, 1000, true);

		//  When the tween loops it calls descend
		this.tween.onLoop.add(this.descend, this);
	},
	
	descend: function() {

		this.cats.y += 15;
        
        for (var c = 0; c < this.cats.children.length; c++) {
            if (this.cats.children[c].y > this.player.y) {
                this.playerDie();   
            }
        }

	},
	
	fireBullet: function  () {

		//  To avoid players being allowed to fire too fast we set a time limit
		if (game.time.now > this.bulletTime)
		{
			//  Grab the first bullet we can from the pool
			bullet = this.bullets.getFirstExists(false);
            this.shot.play();

			if (bullet) {
				//  create the animations for firing
				this.player.body.velocity.x = 0;
                this.player.frame = 3;
				
				var fire = game.add.sprite(this.player.x - 20, this.player.y - 30, 'fire');
				fire.scale.x = this.scale;
				fire.scale.y = this.scale;
				fire.anchor.setTo = (0.5, 0.5);				
                game.global.bulletsFired += 1;
								
				game.time.events.add(100, function() {
					fire.kill();
				});
				
				bullet.reset(this.player.x - 13, this.player.y - 16);
				bullet.body.velocity.y = -400;
				this.bulletTime = game.time.now + 500;
			}
		}

	},	

	enemyFires: function  () {

		//  Grab the first bullet we can from the pool
		this.enemyBullet = this.enemyBullets.getFirstExists(false);

		this.livingEnemies.length = 0;
		
        this.lazer.play();
        
		cat = this.cat;
		livingEnemies = this.livingEnemies;

		this.cats.forEachAlive(function(cat){

			// put every living enemy in an array
			livingEnemies.push(cat);
		});


		if (this.enemyBullet && this.livingEnemies.length > 0) {
			
			var random = game.rnd.integerInRange(0,livingEnemies.length-1);

			// randomly select one of them
			var shooter = livingEnemies[random];
            // Set the bullet origin point:
            var x = shooter.body.x + 28;
            var y = shooter.body.y + 28;
			// And fire the bullet from this enemy
			this.enemyBullet.reset(x, y);

			game.physics.arcade.moveToObject(this.enemyBullet, this.player, 120);
            
            // Configure shooting based on difficulty
            var mult;
            if (game.global.difficulty == "easy") {
                mult = 30;
            } else if (game.global.difficulty == "med") {
                mult = 20;
            } else {
                mult = 15;
            }
            
            //=1000-(1000*(C16/10))
            var l = game.global.level;
            if (l == 1) {
                var timeToFire = 1000; 
            } else {
                var base = 1000;
                var timeToFire = base - (base * ((l - 1) / mult));
            }
			
            this.firingTimer = game.time.now + timeToFire;
		}

	},	

	collisionHandler: function(bullet, cat) {
		
		//  When a bullet hits a cat we kill them both
		bullet.kill();		
		cat.animations.add('die', [1, 2, 3, 4], 10, false);
		cat.play('die');
        game.global.catsKilled += 1;
        
        var meowChange = this.getRandom(0, 10);
        
        if (meowChange > 5) {
            this.meow1.play();    
        } else {
            this.meow2.play();    
        }
        
		game.time.events.add(250, function() {
			cat.kill();           
			if (this.cats.countLiving() == 0) {
                playState.lazer.volume = 0;
				game.global.score += 100;
				this.scoreText.text = this.scoreString + game.global.score;
				this.enemyBullets.callAll('kill',this);		
                
                game.time.events.add(500, function() {
                    game.global.level += 1;
                    game.state.start('level');
                });
				
			}
		}, this);
		
		//  Increase the score.
        if (game.global.difficulty == "easy") {
            game.global.score += 10;
        } else if (game.global.difficulty == "med") {
            game.global.score += 15;    
        } else if (game.global.difficulty == "hard") {
            game.global.score += 20;   
        }
            
            
		this.scoreText.text = this.scoreString + game.global.score;

	},

	enemyHitsPlayer: function(player,bullet) {
		
		bullet.kill();
        game.global.lives -= 1;
        this.player.tint = 0xff0000;
        this.player_hit.play();

		this.live = this.lives.getFirstAlive();
        
        if("vibrate" in window.navigator) {
            window.navigator.vibrate(100); 
        }
		
        if (this.live) {
			this.live.kill();
		}
        
        game.time.events.add(250, function() {             
            this.player.tint = 0xFFFFFF;
        }, this);
            

		// When the player dies
		if (this.lives.countLiving() < 1) {
            game.global.music.stop();
            this.playerDie();	
		}

	},	
    
    vibrate: function() {
        // Vibrate to confirm input to player
        if("vibrate" in window.navigator) {
            window.navigator.vibrate(this.vibdur);    
        }
    },
    
    playerDie: function() {
        if("virbate" in window.navigator) {
            window.navigator.vibrate(250);   
        }
        
        this.player.kill();
        this.player_die.play();
        this.enemyBullets.callAll('kill');
        
        game.time.events.add(500, function() {
            if (game.global.score > localStorage.getItem("highscore")) {
                localStorage.setItem("highscore", game.global.score);
            }
            game.state.start('death');
        });		
    }
};