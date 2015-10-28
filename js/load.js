var loadState= {

    preload: function() {
        
        // Add a loading label on the screen
        var loadingLabel = game.add.text(80, 150, 'loading...', 
                                         {font: '30px Lucida Console', fill: '#ffffff'});
                
        // Loadin Images     
        game.load.image('bullet', 'assets/pixel.png');
        game.load.image('catBullet', 'assets/catBullet.png');
        game.load.image('life', 'assets/hero_sing.png');  
        game.load.image('fire', 'assets/fire.png');
        game.load.image('touch', 'assets/touch.png');
        game.load.image('background', 'assets/space.png');
        game.load.image('title', 'assets/Title.png');
        game.load.image('easyButton', 'assets/easyButton.png');
        game.load.image('medButton', 'assets/medButton.png');
        game.load.image('hardButton', 'assets/hardButton.png');
        game.load.image('leftButton', 'assets/leftButton.png');
        game.load.image('rightButton', 'assets/rightButton.png');
        game.load.image('shootButton', 'assets/shootButton.png');    
        game.load.image('gameover_background', 'assets/gameover_background.png');
        game.load.image('gostatictext', 'assets/gameover_static.png');
        game.load.image('waveScreen', 'assets/wavescreen.png');
        
        // Loading Spritesheets
        game.load.spritesheet('gameover_text', 'assets/gameover_text.png', 138, 18, 3); 
		game.load.spritesheet('hero', 'assets/hero.png', 14, 14, 8);
		game.load.spritesheet('cat', 'assets/cat001.png', 16, 14, 5);
        game.load.spritesheet('cat2', 'assets/cat002.png', 16, 14, 5);
        game.load.spritesheet('cat3', 'assets/cat003.png', 16, 14, 5);
        
    },
    
    create: function() {

        
        // Go to the menu state
        game.state.start('menu');
    },    
};
