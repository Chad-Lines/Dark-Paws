var bootState = {
    
    preload: function () {
        // Loading th image
        game.load.image('progressBar', 'assets/progressBar.png');
        // Loading Sounds
        //game.load.audio('ingame', ['assets/sound/Battalion.mp3', 'assets/sound/Battalion.wav']);
        game.load.audio('ingame', 'assets/sound/Battalion.mp3');
        game.load.audio('player_hit', ['assets/sound/player_hit.mp3', 'assets/sound/player_hit.wav']);
        game.load.audio('player_die', ['assets/sound/player_die.mp3', 'assets/sound/player_die.wav']);
        game.load.audio('lazer', ['assets/sound/Lazer.mp3', 'assets/sound/Lazer.wav']);
        game.load.audio('meow1', ['assets/sound/cute_meow.mp3', 'assets/sound/cute_meow.wav']);
        game.load.audio('meow2', ['assets/sound/angry_meow.mp3', 'assets/sound/angry_meow.wav']);
        game.load.audio('shot', ['assets/sound/shot.mp3', 'assets/sound/shot.wav']);


    },
    
    create: function () {
        this.music = game.add.audio('ingame');
        this.music.volume = 0;
        this.music.play();
        this.music.stop();
        this.meow1 = game.add.audio('meow1');
        this.meow1.volume = 0;
        this.meow1.play();
        this.meow1.stop();
        this.meow2 = game.add.audio('meow2');
        this.meow2.volume = 0;
        this.meow2.play();
        this.meow2.stop();
        this.player_hit = game.add.audio('player_hit');
        this.player_hit.volume = 0;
        this.player_hit.play();
        this.player_hit.stop();       
        this.player_die = game.add.audio('player_die');
        this.player_die.volume = 0;
        this.player_die.play();
        this.player_die.stop();
        this.lazer = game.add.audio('lazer');
        this.lazer.volume = 0;
        this.lazer.play();
        this.lazer.stop();
        

        
        // Starting the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.ratio = this.getRatio('all', 600, 375);
        
        if (!game.device.desktop) {
            if (navigator.isCocoonJS) {
                game.world._container.scale.x = this.ratio.x;
                game.world._container.scale.y = this.ratio.y;
                game.world._container.updateTransform();
            } else {
                // Set scaling type to 'show all'
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

                // Center the game on the screen
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;

                //Apply the scale changes
                game.scale.setScreenSize(true);
            }
			
		}
        
        // Start the load  
        game.state.start('load');
    },
    
    getRatio: function(type, w, h) {
         var scaleX = game.global.width / w,
            scaleY = game.global.height / h,
            result = {
                x: 1,
                y: 1
            };

        switch (type) {
        case 'all':
            result.x = scaleX > scaleY ? scaleY : scaleX;
            result.y = scaleX > scaleY ? scaleY : scaleX;
            break;
        case 'fit':
            result.x = scaleX > scaleY ? scaleX : scaleY;
            result.y = scaleX > scaleY ? scaleX : scaleY;
            break;
        case 'fill':
            result.x = scaleX;
            result.y = scaleY;
            break;
        }

        return result;         
    },
};
