import Phaser from 'phaser';
import axios from 'axios';

/**
 * The title scene.
 */
export default class HighScoresScene extends Phaser.Scene {
  /**
   * Constructs a new title scene.
   */
  constructor() {
    super('high-scores-scene');

  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }

  /**
   * Creates the scene.
   */
  create() {
    axios.get("https://shandsj-scoreboardly.azurewebsites.net/api/scoreboards/b8f4e5bb-e5e3-43ad-b35a-456ecaeb80f5")
      .then(response => {

        this.add.text(30, 10, "RANK", {
          fontFamily: '"Press Start 2P"',
          fontSize: '8px',
        }).setResolution(10);

        this.add.text(90, 10, "SCORE", {
          fontFamily: '"Press Start 2P"',
          fontSize: '8px',
        }).setResolution(10);

        this.add.text(160, 10, "NAME", {
          fontFamily: '"Press Start 2P"',
          fontSize: '8px',
        }).setResolution(10);

        for (let i = 0; i < response.data.scores.length; i++) {
          let entry = response.data.scores[i];
          this.add.text(30, 30 + (i * 20), i + 1, {
            fontFamily: '"Press Start 2P"',
            fontSize: '8px',
          }).setResolution(10);

          this.add.text(90, 30 + (i * 20), entry.score, {
            fontFamily: '"Press Start 2P"',
            fontSize: '8px',
          }).setResolution(10);

          this.add.text(160, 30 + (i * 20), entry.playerName.toUpperCase(), {
            fontFamily: '"Press Start 2P"',
            fontSize: '8px',
          }).setResolution(10);
        }
      });
  }

  /**
   * Updates the scene.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {
  }
}
