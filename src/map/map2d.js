const Room = require('./room')
const {noop} = require('../util')

module.exports = class Map2D {
  constructor (config = {}) {
    this.config = config
    const {height, width, zLevel = 0} = config
    this.height = height
    this.width = width
    this.zLevel = zLevel
    this.map = []
    this.fill()
  }

  fill () {
    this.map.length = this.width
    this.map.fill(null)
    this.map = this.map.map(row => (new Array(this.height).fill(null)))
  }

  getRoomByCoords (...coordinates) {
    const [x, y] = coordinates
    return this.map[x][y]
  }

  create (mapper) {
    let id = 0
    mapper.create((x, y, value) => {
      if (value) return // Already done.
      const title = this.config.title
      const description = this.config.description
      const room = new Room({
        title,
        description
      })
      this.map[x][y] = room
      room.setCoordinates(x, y, this.zLevel)
      room.setId(id++)
    })
  }

  iterate (roomCallback = noop, rowCallback = noop) {
    for (const row of this.map) {
      for (const room of row) {
        roomCallback(room)
      }
      rowCallback(row)
    }
    return this
  }

  draw () {
    let display = ''
    this.iterate(
      room => { display += (room ? '.' : '#') },
      () => { display += '\n' }
    )
    return display
  }

  getAllRooms () {
    const rooms = []
    this.iterate(room => room ? rooms.push(room) : null)
    return rooms
  }
}
