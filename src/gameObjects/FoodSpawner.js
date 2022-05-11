import Food from './Food';

/**
 * Class that spawns food game objects.
 */
export default class FoodSpawner {
  /**
   * Initializes a new instance of the FoodSpawner class.
   * @param {GameScene} scene The game scene.
   * @param {Player} player The player.
   */
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
  }

  /**
   * Spawns a food game object.
   * @return {Food} The spawned food object.
   */
  spawnFood() {
    const MINIMUM_FOOD_X = 1;
    const MAXIMUM_FOOD_X = this.scene.grid.gridWidth - 1;
    const MINIMUM_FOOD_Y = 1;
    const MAXIMUM_FOOD_Y = this.scene.grid.gridHeight - 1;

    let location = undefined;
    do {
      location = this.scene.grid.getGameLocation(
          Phaser.Math.Between(MINIMUM_FOOD_X, MAXIMUM_FOOD_X),
          Phaser.Math.Between(MINIMUM_FOOD_Y, MAXIMUM_FOOD_Y));
    } while (this.player.occupiesLocation(location));

    const food = new Food(this.scene, location.x, location.y);
    food.create();
    return food;
  }
}
