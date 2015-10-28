var levelState = {
    
    create: function() {
        
        // Define Sounds
        if (game.global.level == 1) {
            game.global.music = game.add.audio('ingame');  
            game.global.music.volume = 0.5;
            game.global.music.loop = true;
            game.global.music.play();
        }
      
        var screen = game.add.image(0, 0, 'waveScreen');
        
        var text = "Wave " + game.global.level;
        var nameLabel = game.add.text(32, 32, text, { font: '50px Lucida Console', fill: '#ffffff' });
        var startLabel = game.add.text(32, game.world.height-70, '', {font: '20px Lucida Console', fill: '#ffffff' });
        
        // Checking if the game is being played on desktop or mobile
        if (this.game.device.desktop) {
            startLabel.text = "Press [SPACEBAR] or CLICK to continue";
        } else {
            startLabel.text = "TOUCH anywhere to continue";   
        }        
        
        // Preparing to start the game
        var startkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startkey.onDown.addOnce(this.start, this);
        game.input.onDown.addOnce(this.start, this);
    },
    
    start: function() {
        game.state.start('play');    
    },
    
};