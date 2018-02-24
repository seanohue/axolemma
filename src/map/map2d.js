module.exports = class Map2D {
  constructor ({zLevel}) {
    this.zLevel = zLevel
    this.map = [[]]
  }

  getRoomByCoords (...coordinates) {
    const [x, y] = coordinates
    return this.map[x][y]
  }
}
