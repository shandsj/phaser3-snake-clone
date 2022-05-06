const LEFT = 0;
const RIGHT = 1;
const UP = 2;
const DOWN = 3;

/**
 * Defines the player directions.
 */
export default class PlayerDirection {
  /**
   * The left direction.
   */
  static get left() {
    return LEFT;
  }

  /**
   * The right direction.
   */
  static get right() {
    return RIGHT;
  }

  /**
   * The up direction.
   */
  static get up() {
    return UP;
  }

  /**
   * The down direction.
   */
  static get down() {
    return DOWN;
  }
}
