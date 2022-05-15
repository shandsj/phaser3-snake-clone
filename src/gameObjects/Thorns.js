
const THORN_WIDTH = 32;

/**
 * Defines a game object for the thorns around the game scene.
 */
export default class Thorns {
  /**
   * Initializes a new instance of the Thorns object.
   * @param {Scene} scene The game scene.
   */
  constructor(scene) {
    this.scene = scene;
  }

  /**
   * Creates the game object.
   */
  create() {
    // Add the thorns at the top and bottom of the game screen
    for (let i = 0; i <= this.scene.game.config.width; i=i+THORN_WIDTH) {
      this.scene.add.image(i, 0, 'thorns');
      this.scene.add.image(i, this.scene.game.config.height, 'thorns');
    }

    // Add the thorns to the left and right sides of the game screen
    for (let i = 0; i <= this.scene.game.config.height + THORN_WIDTH; i=i+THORN_WIDTH) {
      this.scene.add.image(0, i, 'thorns').angle = 90;
      this.scene.add.image(this.scene.game.config.width, i, 'thorns').angle = 90;
    }
  }
}
