const ROT = require('rot-js')

const {Tile, Map2D} = require('../map')
const {capitalize} = require('../util')
// TODOS:
// - Pull in options from .axollemaconfig file in cwd if avail
//   otherwise go with fallback defaults.
// - Actually make this a CLI app.

module.exports = function generator (options = {}) {
  const {
    width = 10,
    height = 10,
    depth = 0,
    type = 'Digger'
  } = options

  // Make just a 2D map as MVP.
  if (depth <= 0) {
    const mapperConstructor = ROT.Map[capitalize(type)]
    if (!mapperConstructor) {
      throw new Error(`The map type ${type} is unsupported`)
    }

    const mapper = new mapperConstructor(width, height)
    console.log(mapper)
  } else {
    throw new Error('3D areas are as of yet unsupported. Omit the Z value for your map.')
  }
}
