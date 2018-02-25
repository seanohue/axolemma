const generator = require('./src/generator')
const {parse, write} = require('./src/yaml')
const {resolveTrue} = require('./src/util')

module.exports = {
  async generate (options = {}, promptAsync = resolveTrue) {
    const {
      writeToFile = false,
    } = options

    let goAhead = false
    while (!goAhead) {
      const {graphic, rooms} = generator(options)
      console.log(`Generated an area with ${rooms.length} rooms.\n${graphic}`)
      goAhead = await promptAsync(graphic, rooms.length)
      if (goAhead) {
        const yaml = parse(options, rooms)
        if (options.writeToFile) {
          write(yaml, options)
        }
        return { graphic, rooms, yaml }
      }
    }
  }
}



