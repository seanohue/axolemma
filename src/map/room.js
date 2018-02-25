const dashify = require('dashify')

module.exports = class Room {
  constructor () {
    this.title = 'An Empty Room'
    this.description = 'There is nothing particularly interesting about this place.'
    this.x = NaN
    this.y = NaN
    this.z = NaN
    this.id = ''
  }

  setCoordinates (...coordinates) {
    const [x, y, z] = coordinates
    this.x = x
    this.y = y
    this.z = z
  }

  setId (id = 0) {
    this.id = `${dashify(this.title)}-${id}`
  }

  serialize () {
    const {title, description, id} = this
    const coordinates = [this.x, this.y, this.z]
    return {
      id,
      title,
      description,
      coordinates
    }
  }
}
