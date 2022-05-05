import Phaser from 'phaser'
import GameScene from './GameScene';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 592,
    parent: 'phaser-example',
    scene: [GameScene]
};

export default new Phaser.Game(config);








