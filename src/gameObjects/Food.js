
/**
 * Class that defines a food game object.
 */
export default class Food {
  /**
   * Initializes a new instance of the Food class.
   * @param {Scene} scene The game scene.
   * @param {Number} x The x location of the food.
   * @param {Number} y The y location of the food.
   */
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.sprite = undefined;
  }

  /**
   * Creates the game object.
   */
  create() {
    this.scene.anims.create({
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

    this.sprite = this.scene.add.sprite(this.x, this.y);
    this.sprite.play('idle');
  }

  /**
   * Destroys the game object.
   */
  destroy() {
    this.sprite.destroy();
  }
}
