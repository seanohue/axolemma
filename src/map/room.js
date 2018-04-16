const dashify = require('dashify')

module.exports = class Room {
  constructor (config) {
    this.title = config.title
    this.description = config.description
    this.other = config.other || {}

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
    const data = {
      id,
      title,
      description,
      coordinates
    }

    for (const [prop, value] of Object.entries(this.other)) {
      data[prop] = value
    }

    return data
  }
}
