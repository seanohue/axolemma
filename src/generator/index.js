const ROT = require('rot-js')
const {Tile, Map2D} = require('../map')
const capitalize = require('../util')
// TODOS:
// - Pull in options from .axollemaconfig file in cwd if avail
//   otherwise go with fallback defaults.
// - Actually make this a CLI app.

module.exports = function generator (options) {
  const {
    x = 10,
    y = 10,
    z = 0,
    type = 'Digger'
  } = options

  // Make just a 2D map as MVP.
  if (z <= 0) {
    const mapper = ROT.Map[capitalize(type)];
    if (!mapper) {
      throw new Error(`The map type ${type} is unsupported`);
    }
  } else {
    throw new Error('3D areas are as of yet unsupported. Omit the Z value for your map.');
  }

}
