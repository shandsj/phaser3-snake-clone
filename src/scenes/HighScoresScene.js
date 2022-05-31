import Phaser from 'phaser';
import WebFontFile from '../util/WebFontFile';
import ScoreboardService from '../util/ScoreboardService';

/**
 * The title scene.
 */
export default class HighScoresScene extends Phaser.Scene {
  /**
   * Constructs a new title scene.
   */
  constructor() {
    super('high-scores-scene');

    this.scoreboardService = new ScoreboardService();
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
  async create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.loadingText = this.add.text(screenCenterX, screenCenterY, 'LOADING...', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    })
        .setOrigin(.5)
        .setResolution(10);

    const scoreboard = await this.scoreboardService.getScoreboardAsync();

    this.time.delayedCall(10000, this.onTimer, null, this);
    if (scoreboard == null) {
      this.loadingText.text = 'ERROR LOADING HIGH SCORES!';
      return;
    }

    this.loadingText.destroy();

    this.add.text(screenCenterX - 70, 10, 'RANK', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#ffff00',
    })
        .setOrigin(.5)
        .setResolution(10);

    this.add.text(screenCenterX - 5, 10, 'SCORE', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#ffff00',
    })
        .setOrigin(.5)
        .setResolution(10);

    this.add.text(screenCenterX + 70, 10, 'NAME', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#ffff00',
    })
        .setOrigin(.5)
        .setResolution(10);

    for (let i = 0; i < scoreboard.scores.length; i++) {
      const entry = scoreboard.scores[i];
      this.add.text(screenCenterX - 70, 30 + (i * 20), i + 1, {
        fontFamily: '"Press Start 2P"',
        fontSize: '8px',
      })
          .setOrigin(.5)
          .setResolution(10);

      this.add.text(screenCenterX - 5, 30 + (i * 20), entry.score, {
        fontFamily: '"Press Start 2P"',
        fontSize: '8px',
      })
          .setOrigin(.5)
          .setResolution(10);

      this.add.text(screenCenterX + 70, 30 + (i * 20), entry.playerName.toUpperCase(), {
        fontFamily: '"Press Start 2P"',
        fontSize: '8px',
      })
          .setOrigin(.5)
          .setResolution(10);
    }
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
