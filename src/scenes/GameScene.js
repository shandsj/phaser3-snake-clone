import Phaser from 'phaser';
import Inputs from '../gameObjects/Inputs';
import Player from '../gameObjects/Player';

/**
 * The main game scene.
 */
export default class GameScene extends Phaser.Scene {
  /**
   * Constructs a new game scene.
   */
  constructor() {
    super('game-scene');

    this.foodSprite = undefined;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.image('food', 'assets/food.png');
    this.load.image('snake', 'assets/Snake_body.png');
  }

  /**
   * Creates the scene.
   */
  create() {
    this.player = new Player(this, new Inputs(this));
    this.player.died.addListener(null, this.initializeNewGame, this);

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

    const MINIMUM_FOOD_X = 1;
    const MAXIMUM_FOOD_X = 49;
    const MINIMUM_FOOD_Y = 1;
    const MAXIMUM_FOOD_Y = 36;
    this.foodSprite = this.add.sprite(
        Phaser.Math.Between(MINIMUM_FOOD_X, MAXIMUM_FOOD_X) * 16,
        Phaser.Math.Between(MINIMUM_FOOD_Y, MAXIMUM_FOOD_Y) * 16,
        'food');
  }

  /**
   * Initializes a new game.
   */
  initializeNewGame() {
    this.player.initializeForNewGame();

    if (this.foodSprite != null) {
      this.foodSprite.destroy();
    }

    this.foodSprite = this.add.sprite(
        Phaser.Math.Between(0, 50) * 16,
        Phaser.Math.Between(0, 37) * 16,
        'food');
  }
}
