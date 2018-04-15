const ROT = require('rot-js')

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
    const creationCallback = this.config.weightedRoomsTable
      ? this.weightedCreation.bind(this)
      : this.defaultCreation.bind(this)
    this._id = 0;
    mapper.create(creationCallback)
  }

  defaultCreation (x, y, value) {
    if (value) return // Already done.
    const { title, description } = this.config

    const room = new Room({
      title,
      description
    })

    this.map[x][y] = room
    room.setCoordinates(x, y, this.zLevel)
    room.setId(this._id++)
  }

  weightedCreation (x, y, value) {
    if (value) return // Already done.

    const pick = ROT.RNG.getWeightedValue(this.getWeightedTable())
    const {
      title = this.config.title,
      description = this.config.description
    } = this.config.weightedRoomsTable[pick];

    const room = new Room({
      title,
      description
    })

    this.map[x][y] = room
    room.setCoordinates(x, y, this.zLevel)
    room.setId(this._id++)
  }

  getWeightedTable () {
    if (!this._weightedTable){
      this._weightedTable = {}

      for (const [id, def] of Object.entries(this.config.weightedRoomsTable)) {
        if (!def.weight) {
          console.log('Invalid or missing weight for ', id)
          continue;
        }

        this._weightedTable[id] = def.weight
      }
    }

    return this._weightedTable
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
