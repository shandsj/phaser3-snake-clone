import Phaser from 'phaser';
import WebFontFile from '../util/WebFontFile';
import {Buttons} from 'phaser3-rex-plugins/templates/ui/ui-components';
import ScoreboardService from '../util/ScoreboardService';

/**
 * The game over scene.
 */
export default class GameOverScene extends Phaser.Scene {
  /**
   * Constructs a new game over scene.
   */
  constructor() {
    super('game-over-scene');

    this.scoreboardService = new ScoreboardService();
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
  async create() {
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

    if (await this.scoreboardService.doesScoreMeetScoreboardCriteriaAsync(this.score)) {
      this.add.text(screenCenterX, screenCenterY + 20, 'NEW HIGH SCORE!\nENTER YOUR NAME:', {
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

      const buttons = new Buttons(this, {
        x: screenCenterX,
        y: screenCenterY + 60,
        // fixedWidth: 150,
        // fixedHeight: 10,
        buttons: [
          this.rexUI.add.label({
            width: 50,
            height: 13,
            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0x37946e),
            text: this.add.text(0, 0, 'SUBMIT', {
              fontFamily: '"Press Start 2P"',
              fontSize: '8px',
              resolution: 10,
            }),
            space: {
              left: 5,
              right: 5,
            },
          }),
        ],
        click: {
          mode: 'pointerup',
          clickInterval: 100,
        },
      })
          .layout();

      const that = this;
      buttons.on('button.click', async function(button, index, pointer, event) {
        await that.scoreboardService.submitScoreAsync(that.textBox.text, that.score);
        that.scene.start('title-scene');
      }, this);

      this.add.existing(buttons);
    }
  }

  /**
   * Updates the scene.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {

  }
}
