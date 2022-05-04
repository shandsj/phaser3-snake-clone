import Phaser from 'phaser'

var playerSprites = [];
var playerLength = 1;
var timer = 0;
var playerYDirection = -16;
var playerXDirection = 0;

var scene = new Phaser.Class({
    Extends: Phaser.Scene,
    
    /**
     * The preload function.
     */
    preload: function () {
       this.load.image('snake', 'assets/Snake_body.png');
       this.handleKeyboardInput();
    },

    /**
     * The create function.
     */
    create: function () {
        playerSprites.push(this.add.sprite(400, 300, 'snake'));
    },

    
    /**
     * The update function.
     * @param {} time 
     * @param {*} delta 
     */
    update: function (time, delta) {
        timer += delta;
        if (timer > 250) {
            var newPlayerSprite = this.add.sprite(playerSprites[playerSprites.length - 1].x + playerXDirection, playerSprites[playerSprites.length - 1].y + playerYDirection, 'snake');
            newPlayerSprite.angle = playerYDirection == 0 ? 90 : 0;
            playerSprites.push(newPlayerSprite);
            timer = 0;
        }
    
        while (playerSprites.length > playerLength) {
            var removedPlayerSprite = playerSprites.shift();
            removedPlayerSprite.destroy();
        }    
    },

    /**
     * Handles the input from the keyboard.
     */
    handleKeyboardInput: function () {
        
        this.input.keyboard.on('keydown-W', function (event) {
            
            // Prevent the player from going in the reverse direction
            if (playerYDirection == 16) {
                return;
            }

            playerYDirection = -16;
            playerXDirection = 0;
        });

        this.input.keyboard.on('keydown-A', function (event) {

            // Prevent the player from going in the reverse direction
            if (playerXDirection == 16) {
                return;
            }

            playerYDirection = 0;
            playerXDirection = -16;
        });

        this.input.keyboard.on('keydown-S', function (event) {

            // Prevent the player from going in the reverse direction
            if (playerYDirection == -16) {
                return;
            }

            playerYDirection = 16;
            playerXDirection = 0;
        });

        this.input.keyboard.on('keydown-D', function (event) {

            // Prevent the player from going in the reverse direction
            if (playerXDirection == -16) {
                return;
            }

            playerYDirection = 0;
            playerXDirection = 16;
        });
    }
});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [scene]
};

var game = new Phaser.Game(config);








