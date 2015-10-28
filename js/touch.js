var touchState = {
  
    create: function () {
        
        var instr = game.add.sprite(0, 0, 'touch');

        game.input.onDown.addOnce(this.start, this);
    },
    
    start: function () {
        game.state.start('level');    
    },    
};
