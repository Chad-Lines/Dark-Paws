var statsState = {
    
    create: function() {
        
        var diff;
        
        var bg = game.add.sprite(game.world.width/2, game.world.height/2, 'gameover_background');
        bg.anchor.setTo(0.5, 0.5);
        var txt = game.add.sprite(game.world.width/2-8, game.world.height/2, 'gostatictext');
        txt.anchor.setTo(0.5, 0.5);
        
        if (game.global.difficulty == "easy") {
            diff = "Easy";
        } else if (game.global.difficulty == "med") {
            diff = "Normal";
        } else {
            diff = "Hard";
        }
        
        var text =
            "Game Stats:" +
            "\n-----------------" +
            "\nDifficulty: " + diff +
            "\n\nYour Score: " + game.global.score +
            "\nHigh Score: " + localStorage.getItem("highscore") +
            "\n\nShots Fired: " + game.global.bulletsFired +
            "\nCats Defeated: " + game.global.catsKilled +
            "\nHit Ratio: " + ((game.global.catsKilled / game.global.bulletsFired) * 100).toFixed(2) + "%" +
            "\n\nWaves Defeated: " + (game.global.level - 1);
            
            
        var stats = game.add.text(32, 32, text, {font: '14px Courier New', fill: '#00BFFF'});
        
    
       
        var startkey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        startkey.onDown.addOnce(this.start, this);
        game.input.onDown.addOnce(this.start, this);
        
    },
    
    start: function () {
        game.state.start('menu');    
    },    
}