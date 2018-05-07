const generator = require('./src/generator')
const {parse, write} = require('./src/yaml')
const {resolveTrue} = require('./src/util')
const {getOptions} = require('./src/config')

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
  * @property {string} [genericRoomTitle] A title to be used for all of the rooms in your generated area. Defaults to 'An Empty Room'.
  * @property {string} [genericRoomDesc] A description to be used for all of the rooms in your generated area. Defaults to 'There is nothing particularly interesting about this place.'
  * @property {string} [type] The 'type' of map creator to use. This must be the name of a ROT-js Map constructor. Defaults to 'Uniform'.
  * @property {number} [roomDugPercentage] Percentage in decimal of map coordinates to be turned into rooms. Defaults to 0.25 (25%).
  * @property {number} [timeLimit] Amount of ms to wait for the ROT-js map generator algorithms to complete before giving up. Defaults to 60,000 (one minute).
  * @property {Object} [weightedRoomsTable] A table of room ids to their title, description, and "weight" as used by the ROT-js RNG.
  */

module.exports = {
  /**
   *
   * @param {AxolemmaOptions} [options]
   * @param {Boolean} [giveCallback]
   */
  generate (options = {}, giveCallback) {
    const configuredOptions = Object.assign({},
      getOptions(),
      options
    )

    const {
      writeToFile = false,
      areaTitle = 'Generated Area',
      areaInfo = {}
    } = configuredOptions

    const manifest = {
      title: areaTitle || 'Generated Area',
      info: areaInfo && typeof areaInfo === 'object' ? areaInfo : {}
    }

    const {graphic, rooms} = generator(configuredOptions)
    console.log(`Generated an area with ${rooms.length} filled cells.\n${graphic}`)
    if (giveCallback) {
      return {graphic, rooms, buildCallback, manifest}
    }

    return buildCallback(configuredOptions.writeToFile)

    function buildCallback(shouldWrite) {
      const yaml = parse(configuredOptions, rooms)
      if (shouldWrite) {
        write(yaml, configuredOptions)
      }
      return { graphic, rooms, yaml, manifest }
    }
  },

  parse,
  write
}
