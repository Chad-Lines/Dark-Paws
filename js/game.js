var width = navigator.isCocoonJS ? window.innerWidth : 600;
var height = navigator.isCocoonJS ? window.innerHeight : 375;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameDiv');

// Define global variables
game.global = {
    score: 0,
    highScore: 0,
    lives: 3,
    level: 1,
    width: navigator.isCocoonJS ? window.innerWidth : 600,
    height: navigator.isCocoonJS ? window.innerHeight : 375,
    difficulty: "easy",
    catsKilled: 0,
    bulletsFired: 0,
    music: null
    
};

// Add the various states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('death', deathState);
game.state.add('stats', statsState);
game.state.add('play', playState);
game.state.add('touch', touchState);
game.state.add('level', levelState);

game.state.start('boot');
