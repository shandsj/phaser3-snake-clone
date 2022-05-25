
/**
 * Defines the score game object.
 */
export default class Score {
  /**
   * Initializes a new instance of the Score class.
   * @param {Scene} scene The game scene.
   */
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.text = undefined;
  }

  /**
   * Creates the game object.
   */
  create() {
    this.text = this.scene.add.text(9, 9, '0', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    });

    this.text.setResolution(56);
  }

  /**
   * Updates the game object.
   */
  update() {
    this.text.text = this.score;
  }

  /**
   * Increases the score by the specified value.
   * @param {Number} value The amount to increase the score by.
   */
  increaseScore(value) {
    this.score += value;
  }

  /**
   * Decreases the score by the specified value.
   * @param {Number} value The amount to decrease the score by.
   */
  decreaseScore(value) {
    this.score -= value;
  }

  /**
   * Resets the score.
   */
  reset() {
    this.score = 0;
  }
}
