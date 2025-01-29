import Phaser from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import GameOverScene from './scenes/GameOverScene';
import GameScene from './scenes/GameScene';
import HighScoresScene from './scenes/HighScoresScene';
import TitleScene from './scenes/TitleScene';

/**
 * Calculates a resolution based on the device resolution that scales the
 * artwork designed for a 320x240 resolution appropriately.
 * @return {any} The resolution with width and height properties.
 */
function getResolution() {
  const actualWidth = window.innerWidth * window.devicePixelRatio;
  const actualHeight = window.innerHeight * window.devicePixelRatio;

  let width = 0;
  let height = 0;
  if (actualWidth > actualHeight) {
    const ratio = 320 / actualWidth;
    width = 320;
    height = ratio * actualHeight;
  } else {
    const ratio = 320 / actualHeight;
    height = 320;
    width = ratio * actualWidth;
  }

  return {
    width: width,
    height: height,
  };
}

const resolution = getResolution();
const config = {
  type: Phaser.AUTO,
  width: resolution.width,
  height: resolution.height,
  scale: {
    mode: Phaser.Scale.FIT,
    zoom: 1,
  },
  backgroundColor: '#88cc88',
  pixelArt: true,
  antialias: false,
  autoRound: true,
  roundPixels: true,
  parent: 'game-container',
  dom: {
    createContainer: false,
  },
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: UIPlugin,
      mapping: 'rexUI',
    }],
  },
  scene: [TitleScene, GameScene, GameOverScene, HighScoresScene],
};

/**
 * The web font config variable has to exist before the game loads.
 */
export const WebFontConfig = {
  google: {
    families: ['Press Start 2P'],
  },
};

export default new Phaser.Game(config);
