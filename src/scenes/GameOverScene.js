import Phaser from 'phaser';
import WebFontFile from '../util/WebFontFile';

/**
 * The game over scene.
 */
export default class GameOverScene extends Phaser.Scene {
  /**
   * Constructs a new game over scene.
   */
  constructor() {
    super('game-over-scene');

    this.score = undefined;
  }

  /**
   * Initializes the game over scene.
   * @param {Number} score The player's score.
   */
  init(score) {
    this.score = score;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  /**
   * Creates the scene.
   */
  create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.text(screenCenterX, screenCenterY - 40, 'GAME OVER', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    })
        .setOrigin(.5)
        .setResolution(10);

    this.add.text(screenCenterX, screenCenterY - 20, 'SCORE: ' + this.score, {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    })
        .setOrigin(.5)
        .setResolution(10);

    this.add.text(screenCenterX, screenCenterY + 20, 'ENTER YOUR NAME:', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    })
        .setOrigin(.5)
        .setResolution(10);

    this.textBox = this.add.text(screenCenterX, screenCenterY + 40, '', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#000000',
      fixedWidth: 150,
      fixedHeight: 10,
      backgroundColor: '#ffffff',
    })
        .setOrigin(.5)
        .setResolution(10);

    this.rexUI.edit(this.textBox);

    // this.time.delayedCall(10000, this.onTimer, null, this);
  }

  /**
   * Updates the scene.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {

  }

  /**
   * The timer callback that changes scenes.
   */
  onTimer() {
    this.scene.start('title-scene');
  }
}
