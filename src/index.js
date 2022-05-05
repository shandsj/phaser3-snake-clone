import Phaser from 'phaser'

var playerSprites = [];
var playerLength = 1;
var timer = 0;
var playerYDirection = -16;
var playerXDirection = 0;

var foodSprite;

var scene = new Phaser.Class({
    Extends: Phaser.Scene,
    
    /**
     * The preload function.
     */
    preload: function () {
       this.load.image('snake', 'assets/Snake_body.png');
       this.load.image('food', 'assets/food.png');
       this.handleKeyboardInput();
    },

    /**
     * The create function.
     */
    create: function () {
        this.initializeNewGame();
    },
    
    /**
     * The update function.
     * @param {} time 
     * @param {*} delta 
     */
    update: function (time, delta) {
        timer += delta;
        if (timer > 100) {
            var newPlayerSprite = this.add.sprite(
                playerSprites[playerSprites.length - 1].x + playerXDirection,
                playerSprites[playerSprites.length - 1].y + playerYDirection,
                'snake');
                
            newPlayerSprite.angle = playerYDirection == 0 ? 90 : 0;
            playerSprites.push(newPlayerSprite);
            timer = 0;
        }
    
        while (playerSprites.length > playerLength) {
            var removedPlayerSprite = playerSprites.shift();
            removedPlayerSprite.destroy();
        }

        // Check if the player has collided with a wall
        var playerHead = playerSprites[playerSprites.length - 1];
        if (playerHead.x <= 0 || playerHead.x >= 50 * 16 || playerHead.y <= 0 || playerHead.y >= 37 * 16) {
            this.die();
        }

        // Check if a player has collided with food
        if (playerHead.getCenter().equals(foodSprite.getCenter())) {
            this.eatFood();
        }

        // Check if player has collided with the rest of the player's body
        for (var i = 0; i < playerSprites.length - 3; i++) {
            if (playerHead.getCenter().equals(playerSprites[i].getCenter())) {
                this.die();
            }
        }
    },

    eatFood: function() {
        foodSprite.destroy();
        playerLength++;

        const MINIMUM_FOOD_X = 1;
        const MAXIMUM_FOOD_X = 49;
        const MINIMUM_FOOD_Y = 1;
        const MAXIMUM_FOOD_Y = 36;
        foodSprite = this.add.sprite(
            Phaser.Math.Between(MINIMUM_FOOD_X, MAXIMUM_FOOD_X) * 16,
            Phaser.Math.Between(MINIMUM_FOOD_Y, MAXIMUM_FOOD_Y) * 16,
            'food');
    },

    die: function() {
        this.initializeNewGame();
    },

    initializeNewGame: function() {
        playerLength = 1;
        timer = 0;
        playerYDirection = -16;
        playerXDirection = 0;

        var playerSprite = this.add.sprite(25 * 16, 18 * 16, 'snake');
        playerSprites.push(playerSprite);

        if (foodSprite != null) {
            foodSprite.destroy();
        }

        foodSprite = this.add.sprite(Phaser.Math.Between(0, 50) * 16, Phaser.Math.Between(0, 37) * 16, 'food');
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
    height: 592,
    parent: 'phaser-example',
    scene: [scene]
};

var game = new Phaser.Game(config);








