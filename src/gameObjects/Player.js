import Phaser from 'phaser';

/**
 * The game object for the player.
 */
export default class Player {
  /**
   * Initializes a new instance of the Player class.
   * @param {Scene} scene The scene object.
   * @param {Inputs} inputs The inputs object.
   */
  constructor(scene, inputs) {
    this.scene = scene;
    this.inputs = inputs;

    this.playerSprites = [];
    this.playerLength = 1;
    this.playerYDirection = -16;
    this.playerXDirection = 0;
    this.keys = undefined;
    this.cursors = undefined;
    this.timer = 0;

    this.died = new Phaser.Events.EventEmitter();
  }

  /**
   * Creates the player game object.
   */
  create() {

  }

  /**
   * Updates the player game object.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {
    this.handleMovementInputs();

    this.timer += delta;
    if (this.timer > 100) {
      const playerHead = this.playerSprites[this.playerSprites.length - 1];
      const newPlayerSprite = this.scene.add.sprite(
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
      this.died.emit(null);
    }

    // Check if player has collided with the rest of the player's body
    for (let i = 0; i < this.playerSprites.length - 3; i++) {
      if (playerHead.getCenter().equals(this.playerSprites[i].getCenter())) {
        this.died.emit(null);
      }
    }
  }

  /**
   * Gets the player's head center location.
   * @return {any} The player head center.
   */
  getHeadCenter() {
    return this.playerSprites[this.playerSprites.length - 1].getCenter();
  }

  /**
   * Handles the movement inputs.
   */
  handleMovementInputs() {
    if (this.inputs.isUpMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerYDirection == 16) {
        return;
      }

      this.playerYDirection = -16;
      this.playerXDirection = 0;
    } else if (this.inputs.isLeftMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerXDirection == 16) {
        return;
      }

      this.playerYDirection = 0;
      this.playerXDirection = -16;
    } else if (this.inputs.isDownMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerYDirection == -16) {
        return;
      }

      this.playerYDirection = 16;
      this.playerXDirection = 0;
    } else if (this.inputs.isRightMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerXDirection == -16) {
        return;
      }

      this.playerYDirection = 0;
      this.playerXDirection = 16;
    }
  }

  /**
   * Eats a piece of food.
   */
  eatFood() {
    this.playerLength++;
  }

  /**
   * Initializes a new game.
   */
  initializeForNewGame() {
    this.playerLength = 1;
    this.timer = 0;
    this.playerYDirection = -16;
    this.playerXDirection = 0;

    const playerSprite = this.scene.add.sprite(25 * 16, 18 * 16, 'snake');
    this.playerSprites.push(playerSprite);
  }
}
