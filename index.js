const generator = require('./src/generator')
const {parse, write} = require('./src/yaml')
const {resolveTrue} = require('./src/util')

/**
 * This serves as the entry point to the library via require or import or whatnot.
 * It is also required and used by the CLI app.
 */

/**
  * @typedef {Object} AxolemmaOptions
  * @property {number} [width] The maximum width of the area you'd like to generate (x coordinates). Defaults to 20.
  * @property {number} [height] The maximum height of the area you'd like to generate (y coordinates). Defaults to 20.
  * @property {number} [depth] Unimplemented. The maximum depth (z coordinates or floors) of the area you'd like to generate. Defaults to 0 (2D area).
  * @property {boolean} [writeToFile] Whether to write the YAML result to file or simply return the data. Defaults to false.
  * @property {string} [filepath] Path to write YAML to. Defaults to current working directory
  * @property {string} [areaTitle] Title of area to generate. Defaults to 'Generated Area'
  * @property {Object} [areaInfo] Info object for area manifest. Defaults to object with respawnInterval property set to 60.
  * @property {string} [type] The 'type' of map creator to use. This must be the name of a ROT-js Map constructor. Defaults to 'Uniform'.
  * @property {number} [roomDugPercentage] Percentage in decimal of map coordinates to be turned into rooms. Defaults to 0.25 (25%).
  * @property {timeLimit} [number] Amount of ms to wait for the ROT-js map generator algorithms to complete before giving up. Defaults to 60,000 (one minute).
  */

/**
 * @typedef {Function} AsyncFunction
 * @returns {Promise}
 * @async
 */

module.exports = {
  /**
   *
   * @param {AxolemmaOptions} [options]
   * @param {AsyncFunction} [promptAsync]
   * @async
   */
  async generate (options = {}, promptAsync = resolveTrue) {
    const {
      writeToFile = false
    } = options

    let goAhead = false
    while (!goAhead) {
      const {graphic, rooms} = generator(options)
      console.log(`Generated an area with ${rooms.length} rooms.\n${graphic}`)
      goAhead = await promptAsync(graphic, rooms.length)
      if (goAhead) {
        const yaml = parse(options, rooms)
        if (writeToFile) {
          write(yaml, options)
        }
        return { graphic, rooms, yaml }
      }
    }
  },

  parse,
  write
}
