module.exports = class Room {
  constructor () {
    this.title = 'An Empty Room'
    this.description = 'There is nothing particularly interesting about this place.'
    this.x = NaN
    this.y = NaN
    this.z = NaN
  }
  setCoordinates (...coordinates) {
    const [x, y, z] = coordinates
    this.x = x
    this.y = y
    this.z = z
  }
}
