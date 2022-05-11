import Phaser from 'phaser';
import PlayerDirection from '../gameObjects/PlayerDirection';

/**
 * Defines an input class to abstract what inputs are required to move.
 */
export default class Inputs {
  /**
   * Initializes a new instance of the Inputs class.
   * @param {Scene} scene
   */
  constructor(scene) {
    this.scene = scene;

    this.lastDirectionPress = PlayerDirection.up;
  }

  /**
   * Called when the inputs object is created.
   */
  create() {
    this.createZoneInputs();
    this.createKeyboardInputs();
  }

  /**
   * Determines if the left movement input is down.
   * @return {boolean} True if the left movement input is down; false otherwise.
   */
  isLeftMovementInputDown() {
    return this.lastDirectionPress === PlayerDirection.left;
  }

  /**
   * Determines if the right movement input is down.
   * @return {boolean} True if the right movement input is down;
   *  false otherwise.
   */
  isRightMovementInputDown() {
    return this.lastDirectionPress === PlayerDirection.right;
  }

  /**
   * Determines if the up movement input is down.
   * @return {boolean} True if the up movement input is down; false otherwise.
   */
  isUpMovementInputDown() {
    return this.lastDirectionPress === PlayerDirection.up;
  }

  /**
   * Determines if the down movement input is down.
   * @return {boolean} True if the down movement input is down; false otherwise.
   */
  isDownMovementInputDown() {
    return this.lastDirectionPress === PlayerDirection.down;
  }

  /**
   * Creates the zone inputs.
   */
  createZoneInputs() {
    const zoneWidth = this.scene.game.config.width / 3;
    const zoneHeight = this.scene.game.config.height / 3;

    this.scene.add.zone(zoneWidth, 0, zoneWidth, zoneHeight)
        .setOrigin(0, 0)
        .setName('up')
        .setInteractive();

    this.scene.add.zone(0, zoneHeight, zoneWidth, zoneHeight)
        .setOrigin(0, 0)
        .setName('left')
        .setInteractive();

    this.scene.add.zone(zoneWidth * 2, zoneHeight, zoneWidth, zoneHeight)
        .setOrigin(0, 0)
        .setName('right')
        .setInteractive();

    this.scene.add.zone(zoneWidth, zoneHeight * 2, zoneWidth, zoneHeight)
        .setOrigin(0, 0)
        .setName('down')
        .setInteractive();

    const that = this;
    this.scene.input.on('gameobjectdown', function(pointer, gameObject) {
      switch (gameObject.name) {
        case 'up':
          that.lastDirectionPress = PlayerDirection.up;
          break;

        case 'down':
          that.lastDirectionPress = PlayerDirection.down;
          break;

        case 'left':
          that.lastDirectionPress = PlayerDirection.left;
          break;

        case 'right':
          that.lastDirectionPress = PlayerDirection.right;
          break;
      }
    });
  }

  /**
   * Creates the keyboard inputs.
   */
  createKeyboardInputs() {
    const that = this;
    this.scene.input.keyboard.on('keydown', function(event) {
      switch (event.keyCode) {
        case Phaser.Input.Keyboard.KeyCodes.W:
        case Phaser.Input.Keyboard.KeyCodes.UP:
          that.lastDirectionPress = PlayerDirection.up;
          break;

        case Phaser.Input.Keyboard.KeyCodes.S:
        case Phaser.Input.Keyboard.KeyCodes.DOWN:
          that.lastDirectionPress = PlayerDirection.down;
          break;

        case Phaser.Input.Keyboard.KeyCodes.A:
        case Phaser.Input.Keyboard.KeyCodes.LEFT:
          that.lastDirectionPress = PlayerDirection.left;
          break;

        case Phaser.Input.Keyboard.KeyCodes.D:
        case Phaser.Input.Keyboard.KeyCodes.RIGHT:
          that.lastDirectionPress = PlayerDirection.right;
      }
    });
  }
}
