var deathState = {
  
    create: function () {
        var x, y;
        x = game.world.width /2
        y = game.world.height /2
        
        var go_screen = game.add.sprite(x, y, 'gameover_background');
        go_screen.anchor.setTo(0.5, 0.5);
        
        this.go_text = game.add.sprite(x-8, y, 'gameover_text');
        this.go_text.anchor.setTo(0.5, 0.5);  
        game.physics.enable(this.go_text, Phaser.Physics.ARCADE);
        this.go_text.animations.add('blink', [0, 1, 2], 20, true);
        
        // Preparing to start the game
        var startkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startkey.onDown.addOnce(this.start, this);
        game.input.onDown.addOnce(this.start, this);
        
        
    },
    
    update: function() {
        
        this.go_text.animations.play('blink');
        
    },
    
    start: function () {
        game.state.start('stats');    
    },    
};
