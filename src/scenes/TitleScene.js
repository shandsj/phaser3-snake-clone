import Phaser from 'phaser';

/**
 * The title scene.
 */
export default class TitleScene extends Phaser.Scene {
  /**
   * Constructs a new title scene.
   */
  constructor() {
    super('title-scene');

    this.startText = undefined;
    this.leaderboardText = undefined;
    this.selectedOption = undefined;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    this.load.image('title', 'assets/TitleScreen.png');
  }

  /**
   * Creates the scene.
   */
  create() {
    const that = this;
    this.input.keyboard.on('keydown', function(event) {
      switch (event.keyCode) {
        case Phaser.Input.Keyboard.KeyCodes.ENTER:
          if (that.selectedOption == that.startText) {
            that.scene.start('game-scene');
          } else {
            that.scene.start('high-scores-scene');
          }
          break;

        case Phaser.Input.Keyboard.KeyCodes.W:
        case Phaser.Input.Keyboard.KeyCodes.UP:
          if (that.selectedOption == that.startText) {
            that.selectedOption = that.leaderboardText;
          } else {
            that.selectedOption = that.startText;
          }
          break;

        case Phaser.Input.Keyboard.KeyCodes.S:
        case Phaser.Input.Keyboard.KeyCodes.DOWN:
          if (that.selectedOption == that.startText) {
            that.selectedOption = that.leaderboardText;
          } else {
            that.selectedOption = that.startText;
          }
          break;
      }
    });

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.image(screenCenterX, screenCenterY - 40, 'title').setOrigin(.55);

    this.startText = this.add.text(screenCenterX, screenCenterY + 20, 'START', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    })
        .setOrigin(0.5)
        .setPadding(100, 100, 100, 100)
        .setResolution(10);

    this.leaderboardText = this.add.text(screenCenterX, screenCenterY + 40, 'HIGH SCORES', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    })
        .setOrigin(0.5)
        .setPadding(100, 100, 100, 100)
        .setResolution(10);

    this.selectedOption = this.startText;
  }

  /**
   * Updates the scene.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {
    this.startText.text = 'START';
    this.leaderboardText.text = 'HIGH SCORES';

    if (this.selectedOption == this.startText) {
      this.startText.text = '> START';
    } else {
      this.leaderboardText.text = '> HIGH SCORES';
    }
  }
}
