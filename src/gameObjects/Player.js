import Phaser from 'phaser';
import GenerateFrameNumberConfigFactory from '../scenes/GenerateFrameNumberConfigFactory';
import PlayerDirection from './PlayerDirection';

const PLAYER_SPRITE_WIDTH = 16;
const PLAYER_SPRITE_HEIGHT = 16;
const MOVEMENT_TIMER_INTERVAL = 300;

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
    this.scene.anims.create({
      key: 'body1',
      frames: this.scene.anims.generateFrameNumbers('snake', GenerateFrameNumberConfigFactory.createGenerateFrameNumberConfig(1, 7, 2)),
      duration: MOVEMENT_TIMER_INTERVAL,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'body2',
      frames: this.scene.anims.generateFrameNumbers('snake', GenerateFrameNumberConfigFactory.createGenerateFrameNumberConfig(2, 7, 2)),
      duration: MOVEMENT_TIMER_INTERVAL,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'tail',
      frames: this.scene.anims.generateFrameNumbers('snake', GenerateFrameNumberConfigFactory.createGenerateFrameNumberConfig(0, 7, 2)),
      duration: MOVEMENT_TIMER_INTERVAL,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'head',
      frames: this.scene.anims.generateFrameNumbers('snake', GenerateFrameNumberConfigFactory.createGenerateFrameNumberConfig(3, 7, 2)),
      duration: MOVEMENT_TIMER_INTERVAL,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn1',
      frames: [{key: 'snake', frame: 5}],
      framerate: 8,
      repeat: 1,
    });

    this.scene.anims.create({
      key: 'turn2',
      frames: [{key: 'snake', frame: 6}],
      framerate: 8,
      repeat: 1,
    });

    this.initializeForNewGame();

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

    // Check if the player has collided with a wall
    if (this.scene.grid.isOutsideGrid(this.headSprite.getCenter().x, this.headSprite.getCenter().y)) {
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
   * Gets the player's tail sprite.
   */
  get tailSprite() {
    return this.playerSprites[0];
  }

  /**
   * The callback function used for the movement timer.
   */
  movePlayerTimerCallback() {    
    const nextHeadSpritePosition = this.calculateNextHeadSpritePosition();
    const nextHeadSprite = this.scene.add.sprite(nextHeadSpritePosition.x, nextHeadSpritePosition.y);
    nextHeadSprite.angle = this.calculateNextHeadSpriteAngle();    
    this.playerSprites.push(nextHeadSprite);

    // Player length does not include the "next head" sprite.
    let removedSpriteCount = 0;
    while (this.playerSprites.length > this.playerLength) {
      const removedPlayerSprite = this.playerSprites.shift();
      removedPlayerSprite.destroy();
      removedSpriteCount++;
    }

    this.tailSprite.angle = this.playerSprites[1].angle;

    // If the player didn't grow this update, then don't
    // replay the tail animation. Otherwise it will jump
    // to its full length.
    if (removedSpriteCount >= 1) {
      this.tailSprite.play('tail');
    }
    
    this.headSprite.play('head');

    if (this.playerLength > 2) {
      // If the player is longer than 2 units, then replace
      // the last head with a body, or a turn.
      const previousHeadSprite = this.playerSprites[this.playerSprites.length - 2];
      if (previousHeadSprite.angle == this.headSprite.angle) {
        previousHeadSprite.play('body' + Phaser.Math.Between(1, 2));
      } else if (
        (this.headSprite.angle == 90 && previousHeadSprite.angle == 0) ||
        (this.headSprite.angle == -180 && previousHeadSprite.angle == 90) ||
        (this.headSprite.angle == -90 && previousHeadSprite.angle == -180) ||
        (this.headSprite.angle == 0 && previousHeadSprite.angle == -90)) {
        previousHeadSprite.play('turn1');
      } else if (
        (this.headSprite.angle == 0 && previousHeadSprite.angle == 90) ||
        (this.headSprite.angle == 90 && previousHeadSprite.angle == -180) ||
        (this.headSprite.angle == -180 && previousHeadSprite.angle == -90) ||
        (this.headSprite.angle == -90 && previousHeadSprite.angle == 0)) {
        previousHeadSprite.play('turn2');
      }
    }
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
        return -90;
      case PlayerDirection.down:
        return 90;
      case PlayerDirection.right:
        return 0;
      case PlayerDirection.left:
        return -180;
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
    this.playerLength = 3;
    this.playerDirection = PlayerDirection.right;

    this.playerSprites.push(this.scene.add.sprite(
        this.scene.grid.middleCellGameLocation.x,
        this.scene.grid.middleCellGameLocation.y));  
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
