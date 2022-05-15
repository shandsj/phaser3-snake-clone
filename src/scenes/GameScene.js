import Phaser from 'phaser';
import Inputs from '../util/Inputs';
import Player from '../gameObjects/Player';
import Grid from '../util/Grid';
import FoodSpawner from '../gameObjects/FoodSpawner';
import Thorns from '../gameObjects/Thorns';

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
    this.thorns = undefined;
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

    this.thorns = new Thorns(this);
    this.thorns.create();

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
