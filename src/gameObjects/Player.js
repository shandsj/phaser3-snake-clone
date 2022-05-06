import Phaser from 'phaser';
import PlayerDirection from './PlayerDirection';

const PLAYER_SPRITE_WIDTH = 16;
const PLAYER_SPRITE_HEIGHT = 16;
const MOVEMENT_TIMER_INTERVAL = 100;

/**
 * The default starting x-axis position for the player, in grid units.
 */
const DEFAULT_PLAYER_GRID_X_POSITION = 25;

/**
 * The default starting y-axis position for the player, in grid units.
 */
const DEFAULT_PLAYER_GRID_Y_POSITION = 18;

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

    this.playerDirection = PlayerDirection.up;

    this.playerSprites = [];
    this.playerLength = 1;
    this.keys = undefined;
    this.cursors = undefined;
    this.timer = 0;

    this.died = new Phaser.Events.EventEmitter();
  }

  /**
   * Creates the player game object.
   */
  create() {
    this.timer = this.scene.time.addEvent({
      delay: MOVEMENT_TIMER_INTERVAL,
      callback: this.movePlayerTimerCallback,
      callbackScope: this,
      loop: true,
    });
  }

  /**
   * Updates the player game object.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {
    this.handleMovementInputs();

    while (this.playerSprites.length > this.playerLength) {
      const removedPlayerSprite = this.playerSprites.shift();
      removedPlayerSprite.destroy();
    }

    // Check if the player has collided with a wall
    if (this.headSprite.getCenter().x <= 0 ||
      this.headSprite.getCenter().x >= 50 * 16 ||
      this.headSprite.getCenter().y <= 0 ||
      this.headSprite.getCenter().y >= 37 * 16) {
      this.died.emit(null);
    }

    // Check if player has collided with the rest of the player's body
    for (let i = 0; i < this.playerSprites.length - 3; i++) {
      if (this.headSprite.getCenter().equals(this.playerSprites[i].getCenter())) {
        this.died.emit(null);
      }
    }
  }

  /**
   * Gets the player's head sprite.
   */
  get headSprite() {
    return this.playerSprites[this.playerSprites.length - 1];
  }

  /**
   * The callback function used for the movement timer.
   */
  movePlayerTimerCallback() {
    const nextHeadSpritePosition = this.calculateNextHeadSpritePosition();
    const nextHeadSprite = this.scene.add.sprite(nextHeadSpritePosition.x, nextHeadSpritePosition.y, 'snake');

    nextHeadSprite.angle = this.calculateNextHeadSpriteAngle();
    this.playerSprites.push(nextHeadSprite);
  }

  /**
   * Calculates the next head sprite position.
   * @return {any} The calculated next head sprite position.
   */
  calculateNextHeadSpritePosition() {
    return {
      x: this.headSprite.getCenter().x + this.xAxisMovementDelta,
      y: this.headSprite.getCenter().y + this.yAxisMovementDelta,
    };
  }

  /**
   * Calculates the next head sprite angle, in degrees.
   * @return {int} The calculated next head sprite angle, in degrees.
   */
  calculateNextHeadSpriteAngle() {
    switch (this.playerDirection) {
      case PlayerDirection.up:
      case PlayerDirection.down:
        return 0;

      case PlayerDirection.right:
      case PlayerDirection.left:
        return 90;
    }
  }

  /**
   * Handles the movement inputs.
   */
  handleMovementInputs() {
    if (this.inputs.isUpMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerDirection == PlayerDirection.down) {
        return;
      }

      this.playerDirection = PlayerDirection.up;
    } else if (this.inputs.isLeftMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerDirection == PlayerDirection.right) {
        return;
      }

      this.playerDirection = PlayerDirection.left;
    } else if (this.inputs.isDownMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerDirection == PlayerDirection.up) {
        return;
      }

      this.playerDirection = PlayerDirection.down;
    } else if (this.inputs.isRightMovementInputDown()) {
      // Prevent the player from going in the reverse direction
      if (this.playerDirection == PlayerDirection.left) {
        return;
      }

      this.playerDirection = PlayerDirection.right;
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
    this.playerDirection = PlayerDirection.up;

    const newHeadSprite = this.scene.add.sprite(
        DEFAULT_PLAYER_GRID_X_POSITION * PLAYER_SPRITE_WIDTH,
        DEFAULT_PLAYER_GRID_Y_POSITION * PLAYER_SPRITE_HEIGHT,
        'snake');
    this.playerSprites.push(newHeadSprite);
  }

  /**
   * Gets the amount of pixels the player needs to move on the x-axis.
   * @return {int} The amount of pixels to move on the x-axis
   */
  get xAxisMovementDelta() {
    switch (this.playerDirection) {
      case PlayerDirection.up:
      case PlayerDirection.down:
        return 0;

      case PlayerDirection.left:
        return -PLAYER_SPRITE_WIDTH;

      case PlayerDirection.right:
        return PLAYER_SPRITE_WIDTH;
    }
  }

  /**
   * Gets the amount of pixels the player needs to move on the y-axis.
   * @return {int} The amount of pixels to move on the y-axis
   */
  get yAxisMovementDelta() {
    switch (this.playerDirection) {
      case PlayerDirection.left:
      case PlayerDirection.right:
        return 0;

      case PlayerDirection.up:
        return -PLAYER_SPRITE_HEIGHT;

      case PlayerDirection.down:
        return PLAYER_SPRITE_HEIGHT;
    }
  }
}
