import Phaser from 'phaser';
import Inputs from '../util/Inputs';
import Player from '../gameObjects/Player';
import Grid from '../util/Grid';
import FoodSpawner from '../gameObjects/FoodSpawner';

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
    this.food = undefined;
    this.player = undefined;
    this.inputs = undefined;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.spritesheet('food', 'assets/food.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('snake', 'assets/snake.png', {frameWidth: 16, frameHeight: 16});
    this.load.image('thorns', 'assets/thorns.png');
    this.load.image('arrow', 'assets/arrow.png');
  }

  /**
   * Creates the scene.
   */
  create() {
    this.inputs = new Inputs(this);
    this.inputs.create();

    // Add the thorns at the top and bottom of the game screen
    for (let i = 0; i <= this.game.config.width; i=i+32) {
      this.add.image(i, 0, 'thorns');
      this.add.image(i, this.game.config.height, 'thorns');
    }

    // Add the thorns to the left and right sides of the game screen
    for (let i = 0; i <= this.game.config.height + 32; i=i+32) {
      this.add.image(0, i, 'thorns').angle = 90;
      this.add.image(this.game.config.width, i, 'thorns').angle = 90;
    }

    this.player = new Player(this, this.inputs);
    this.player.died.addListener(null, this.initializeNewGame, this);
    this.player.create();

    this.foodSpawner = new FoodSpawner(this, this.player);

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
    if (this.player.headSprite.getCenter().equals(this.food.sprite.getCenter())) {
      this.eatFood();
    }
  }

  /**
   * Eats a piece of food.
   */
  eatFood() {
    this.food.destroy();
    this.player.eatFood();
    this.food = this.foodSpawner.spawnFood();
  }

  /**
   * Initializes a new game.
   */
  initializeNewGame() {
    this.player.initializeForNewGame();

    if (this.food != null) {
      this.food.destroy();
    }

    this.food = this.foodSpawner.spawnFood();
  }
}
