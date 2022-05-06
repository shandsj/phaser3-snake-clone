import Phaser from 'phaser';

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

    this.keys = this.scene.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  /**
   * Determines if the left movement input is down.
   * @return {boolean} True if the left movement input is down; false otherwise.
   */
  isLeftMovementInputDown() {
    return this.keys.a.isDown;
  }

  /**
   * Determines if the right movement input is down.
   * @return {boolean} True if the right movement input is down;
   *  false otherwise.
   */
  isRightMovementInputDown() {
    return this.keys.d.isDown;
  }

  /**
   * Determines if the up movement input is down.
   * @return {boolean} True if the up movement input is down; false otherwise.
   */
  isUpMovementInputDown() {
    return this.keys.w.isDown;
  }

  /**
   * Determines if the down movement input is down.
   * @return {boolean} True if the down movement input is down; false otherwise.
   */
  isDownMovementInputDown() {
    return this.keys.s.isDown;
  }
}
