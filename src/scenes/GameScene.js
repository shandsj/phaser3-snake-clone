import Phaser from 'phaser';
import Inputs from '../util/Inputs';
import Player from '../gameObjects/Player';
import Grid from '../util/Grid';
import FoodSpawner from '../gameObjects/FoodSpawner';
import Thorns from '../gameObjects/Thorns';
import Score from '../gameObjects/Score';

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
    this.score = undefined;
  }

  /**
   * Preloads the scene.
   */
  preload() {
    this.load.spritesheet('food', 'assets/food.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('snake', 'assets/snake.png', {frameWidth: 16, frameHeight: 16});
    this.load.image('thorns', 'assets/thorns.png');
    this.load.image('arrow', 'assets/arrow.png');
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }

  /**
   * Creates the scene.
   */
  create() {
    this.inputs = new Inputs(this);
    this.inputs.create();

    this.thorns = new Thorns(this);
    this.thorns.create();

    this.score = new Score(this);
    this.score.create();

    this.player = new Player(this, this.inputs);
    this.player.died.addListener(null, this.onPlayerDied, this);
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
    this.score.update();
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
    this.score.increaseScore(10);
  }

  /**
   * Initializes a new game.
   */
  initializeNewGame() {
    this.score.reset();
    this.player.initializeForNewGame();

    if (this.food != null) {
      this.food.destroy();
    }

    this.food = this.foodSpawner.spawnFood();
  }

  /**
   * Callback for when the player dies.
   */
  onPlayerDied() {
    this.scene.start('title-scene');
  }
}
