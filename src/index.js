import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 592,
  backgroundColor: '#88cc88',
  pixelArt: true,
  antialias: false,
  autoRound: true,
  roundPixels: true,
  parent: 'phaser-example',
  scene: [GameScene],
};

export default new Phaser.Game(config);
