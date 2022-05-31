import Phaser from 'phaser';
import WebFontLoader from 'webfontloader';

/**
 * Provides an implementation of a Phaser File that loads web fonts.
 */
export default class WebFontFile extends Phaser.Loader.File {
  /**
   * Initializes a new instance of the WebFontFile class.
   * @param {*} loader The loader.
   * @param {*} fontNames The font names to load.
   * @param {*} service The service to use.
   */
  constructor(loader, fontNames, service = 'google') {
    super(loader, {
      type: 'webfont',
      key: fontNames.toString(),
    });

    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
  }

  /**
   * Loads the file.
   */
  load() {
    const config = {
      active: () => {
        this.loader.nextFile(this, true);
      },
    };

    switch (this.service) {
      case 'google':
        config['google'] = {
          families: this.fontNames,
        };
        break;

      default:
        throw new Error('Unsupported font service');
    }

    WebFontLoader.load(config);
  }
}
