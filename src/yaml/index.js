const yaml = require('js-yaml')
const fs = require('fs')

module.exports = { parse, write }

function parse (options, rooms) {
  if (!rooms || !rooms.length) {
    throw new Error('Attempted to parse an empty area.')
  }

  const {
    areaTitle = 'Generated Area',
    areaInfo = { respawnInterval: 60 }
  } = options

  if (typeof areaInfo !== 'object') {
    throw new Error('Invalid area info field.')
  }

  const yamlOptions = { flowLevel: 2 }
  const roomsYaml = yaml.safeDump(
    rooms.map(room => room.serialize()),
    yamlOptions
  )
  const areaYaml = yaml.safeDump({
    title: areaTitle,
    info: areaInfo
  }, yamlOptions)

  return { roomsYaml, areaYaml }
}

// TODO: Test
function write (yaml, options) {
  const { roomsYaml, areaYaml } = yaml
  const {
    filepath = process.cwd()
  } = options
  console.log('Writing to ' + filepath)
  fs.writeFileSync(filepath + '/manifest.yml', areaYaml)
  fs.writeFileSync(filepath + '/rooms.yml', roomsYaml)
  console.log('Done!')
}
