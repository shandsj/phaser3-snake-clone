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

    this.text = undefined;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
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
          that.scene.start('game-scene');
          break;
      }
    });

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.image(screenCenterX, screenCenterY - 40, 'title').setOrigin(.55);

    this.text = this.add.text(screenCenterX, screenCenterY + 20, 'PRESS ENTER', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
    }).setOrigin(0.5).setPadding(100, 100, 100, 100);

    this.text.setResolution(10);
  }

  /**
   * Updates the scene.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {

  }
}
