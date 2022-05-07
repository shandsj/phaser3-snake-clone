
const GRID_CELL_SIZE = 16;

/**
 * Defines a grid utility class.
 */
export default class Grid {
  /**
   * Initializes a new instance of the Grid class.
   * @param {*} scene The scene.
   */
  constructor(scene) {
    this.scene = scene;
  }

  /**
   * Gets the grid's cell size.
   */
  get cellSize() {
    return GRID_CELL_SIZE;
  }

  /**
   * Gets the grid width, in cells.
   */
  get gridWidth() {
    return this.scene.gameWidth / this.cellSize;
  }

  /**
   * Gets the grid height, in cells.
   */
  get gridHeight() {
    return this.scene.gameHeight / this.cellSize;
  }

  /**
   * Gets the middle cell location, in pixels.
   */
  get middleCellGameLocation() {
    return {
      x: (Math.floor(this.gridWidth / 2)) * this.cellSize,
      y: (Math.floor(this.gridHeight / 2)) * this.cellSize,
    };
  }

  /**
   * Gets a game location in pixels for the specified grid coordinates.
   * @param {integer} gridX The grid x position.
   * @param {integer} gridY The grid y position.
   * @return {any} The calculated game location, in pixels.
   */
  getGameLocation(gridX, gridY) {
    return {
      x: gridX * this.cellSize,
      y: gridY * this.cellSize,
    };
  }

  /**
   * Determines if the specified pixel game coordinates are outside of the grid.
   * @param {integer} gameX The game x coordinate in pixels.
   * @param {integer} gameY The game y coordinate in pixels.
   * @return {boolean} True if the coordinates are outside the grid, false otherwise.
   */
  isOutsideGrid(gameX, gameY) {
    return gameX <= 0 ||
      gameX >= this.scene.gameWidth ||
      gameY <= 0 ||
      gameY >= this.scene.gameHeight;
  }
}
