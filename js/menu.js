var menuState = {
  
    create: function () {

        
        var screen = game.add.sprite(0, 0, 'title');
        
        // If there is no high-score, then we set it to 0
        // (otherwise it shows "null" which is ugly)
        if (localStorage.getItem("highscore") === null) {
            localStorage.setItem("highscore", 0);    
        }       
        var text = 'Your score: ' + game.global.score + '\nHigh score: ' + localStorage.getItem("highscore");        
        var scoreLabel = game.add.text(400, 250, text, {font: '20px Lucida Console', fill: '#00BFFF' });         
        
        var credText = 'By Chad Lines & Thomas "Bahototh" Finholm' +'\nMusic by Matthew Le Blanc (synthr.net)';
        var creds = game.add.text(150, 350, credText, {font: '12px Lucida Console', fill: '#00BFFF' });
        //350 00BFFF
        this.addMobileInputs();
        
        // Resetting the global variables
		game.global.lives = 3;
		game.global.score = 0;
        game.global.level = 1;
    },
    
    addMobileInputs: function() {
		
		var x = 32
		
		// Set difficulty to easy
		this.easyButton = game.add.sprite(x, 200, 'easyButton');
		this.easyButton.inputEnabled = true;
        this.easyButton.events.onInputDown.add(this.startEasy, this);
		
		// Set difficulty to med
		this.medButton = game.add.sprite(x, 250, 'medButton');
		this.medButton.inputEnabled = true;
        this.medButton.events.onInputDown.add(this.startMed, this);
				
		// Set difficulty to hard
		this.hardButton = game.add.sprite(x, 300, 'hardButton');
		this.hardButton.inputEnabled = true;
		this.hardButton.events.onInputDown.add(this.startHard, this);
	
	},
   
    startEasy: function() {
        game.global.difficulty = "easy";
        if (this.game.device.desktop) {
            game.state.start('level');   
        } else {
            game.state.start('touch');   
        }       
    },
    
    startMed: function() {
        game.global.difficulty = "med";
        if (this.game.device.desktop) {
            game.state.start('level');   
        } else {
            game.state.start('touch');   
        }
    },   
    
    startHard: function() {
        game.global.difficulty = "hard";
        if (this.game.device.desktop) {
            game.state.start('level');   
        } else {
            game.state.start('touch');   
        }
    },   

    
};
