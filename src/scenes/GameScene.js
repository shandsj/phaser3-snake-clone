import Phaser from 'phaser';
import Inputs from '../gameObjects/Inputs';
import Player from '../gameObjects/Player';
import Grid from '../util/Grid';

/**
 * The main game scene.
 */
export default class GameScene extends Phaser.Scene {
  /**
   * Constructs a new game scene.
   */
  constructor() {
    super('game-scene');

    this.grid = new Grid(this);
    this.foodSprite = undefined;
    this.player = undefined;
    this.inputs = undefined;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.spritesheet('food', 'assets/food.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('snake', 'assets/snake.png', {frameWidth: 16, frameHeight: 16});
    this.load.image('arrow', 'assets/arrow.png');
  }

  /**
   * Creates the scene.
   */
  create() {
    this.inputs = new Inputs(this);
    this.inputs.create();

    this.player = new Player(this, this.inputs);
    this.player.died.addListener(null, this.initializeNewGame, this);
    this.player.create();

    this.anims.create({
      key: 'idle',
      frames: [
        {key: 'food', frame: 0, duration: 500},
        {key: 'food', frame: 1, duration: 200},
        {key: 'food', frame: 2, duration: 500},
        {key: 'food', frame: 3, duration: 100},
        {key: 'food', frame: 4, duration: 100},
        {key: 'food', frame: 5, duration: 500},
        {key: 'food', frame: 6, duration: 250},
      ],
      framerate: 8,
      repeat: -1,
    });

    this.initializeNewGame();
  }

  /**
   * Updates the scene.
   * @param {*} time The game time.
   * @param {*} delta The delta time since update was last called.
   */
  update(time, delta) {
    this.player.update(time, delta);

    // Check if a player has collided with food
    if (this.player.headSprite.getCenter().equals(this.foodSprite.getCenter())) {
      this.eatFood();
    }
  }

  /**
   * Eats a piece of food.
   */
  eatFood() {
    this.foodSprite.destroy();
    this.player.eatFood();
    this.spawnFood();
  }

  /**
   * Initializes a new game.
   */
  initializeNewGame() {
    this.player.initializeForNewGame();

    if (this.foodSprite != null) {
      this.foodSprite.destroy();
    }

    this.spawnFood();
  }

  /**
   * Spawns a food game object.
   */
  spawnFood() {
    const MINIMUM_FOOD_X = 1;
    const MAXIMUM_FOOD_X = this.grid.gridWidth - 1;
    const MINIMUM_FOOD_Y = 1;
    const MAXIMUM_FOOD_Y = this.grid.gridHeight - 1;

    const location = this.grid.getGameLocation(
        Phaser.Math.Between(MINIMUM_FOOD_X, MAXIMUM_FOOD_X),
        Phaser.Math.Between(MINIMUM_FOOD_Y, MAXIMUM_FOOD_Y));

    this.foodSprite = this.add.sprite(location.x, location.y);
    this.foodSprite.play('idle');
  }
}
