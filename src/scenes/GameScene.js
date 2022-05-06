import Phaser from 'phaser';

/**
 * The main game scene.
 */
export default class GameScene extends Phaser.Scene {
  /**
   * Constructs a new game scene.
   */
  constructor() {
    super('game-scene');

    this.playerSprites = [];
    this.playerLength = 1;
    this.timer = 0;
    this.playerYDirection = -16;
    this.playerXDirection = 0;
    this.foodSprite = undefined;
    this.cursors = undefined;
    this.keys = undefined;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.image('snake', 'assets/Snake_body.png');
    this.load.image('food', 'assets/food.png');
  }

  /**
   * Creates the scene.
   */
  create() {
    this.initializeNewGame();
    this.keys = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  /**
   * Updates the scene.
   * @param {*} time
   * @param {*} delta
   */
  update(time, delta) {
    this.handleKeyboardInput();

    this.timer += delta;
    if (this.timer > 100) {
      const playerHead = this.playerSprites[this.playerSprites.length - 1];
      const newPlayerSprite = this.add.sprite(
          playerHead.x + this.playerXDirection,
          playerHead.y + this.playerYDirection,
          'snake');

      newPlayerSprite.angle = this.playerYDirection == 0 ? 90 : 0;
      this.playerSprites.push(newPlayerSprite);
      this.timer = 0;
    }

    while (this.playerSprites.length > this.playerLength) {
      const removedPlayerSprite = this.playerSprites.shift();
      removedPlayerSprite.destroy();
    }

    // Check if the player has collided with a wall
    const playerHead = this.playerSprites[this.playerSprites.length - 1];
    if (playerHead.x <= 0 ||
        playerHead.x >= 50 * 16 ||
        playerHead.y <= 0 ||
        playerHead.y >= 37 * 16) {
      this.die();
    }

    // Check if a player has collided with food
    if (playerHead.getCenter().equals(this.foodSprite.getCenter())) {
      this.eatFood();
    }

    // Check if player has collided with the rest of the player's body
    for (let i = 0; i < this.playerSprites.length - 3; i++) {
      if (playerHead.getCenter().equals(this.playerSprites[i].getCenter())) {
        this.die();
      }
    }
  }

  /**
   * Eats a piece of food.
   */
  eatFood() {
    this.foodSprite.destroy();
    this.playerLength++;

    const MINIMUM_FOOD_X = 1;
    const MAXIMUM_FOOD_X = 49;
    const MINIMUM_FOOD_Y = 1;
    const MAXIMUM_FOOD_Y = 36;
    this.foodSprite = this.add.sprite(
        Phaser.Math.Between(MINIMUM_FOOD_X, MAXIMUM_FOOD_X) * 16,
        Phaser.Math.Between(MINIMUM_FOOD_Y, MAXIMUM_FOOD_Y) * 16,
        'food');
  }

  /**
   * Kills the player and initializes a new game.
   */
  die() {
    this.initializeNewGame();
  }

  /**
   * Handles the keyboard input.
   */
  handleKeyboardInput() {
    if (this.keys.w.isDown) {
      // Prevent the player from going in the reverse direction
      if (this.playerYDirection == 16) {
        return;
      }

      this.playerYDirection = -16;
      this.playerXDirection = 0;
    } else if (this.keys.a.isDown) {
      // Prevent the player from going in the reverse direction
      if (this.playerXDirection == 16) {
        return;
      }

      this.playerYDirection = 0;
      this.playerXDirection = -16;
    } else if (this.keys.s.isDown) {
      // Prevent the player from going in the reverse direction
      if (this.playerYDirection == -16) {
        return;
      }

      this.playerYDirection = 16;
      this.playerXDirection = 0;
    } else if (this.keys.d.isDown) {
      // Prevent the player from going in the reverse direction
      if (this.playerXDirection == -16) {
        return;
      }

      this.playerYDirection = 0;
      this.playerXDirection = 16;
    }
  }

  /**
   * Initializes a new game.
   */
  initializeNewGame() {
    this.playerLength = 1;
    this.timer = 0;
    this.playerYDirection = -16;
    this.playerXDirection = 0;

    const playerSprite = this.add.sprite(25 * 16, 18 * 16, 'snake');
    this.playerSprites.push(playerSprite);

    if (this.foodSprite != null) {
      this.foodSprite.destroy();
    }

    this.foodSprite = this.add.sprite(
        Phaser.Math.Between(0, 50) * 16,
        Phaser.Math.Between(0, 37) * 16,
        'food');
  }
}
