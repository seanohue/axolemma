const yaml = require('js-yaml')
const fs = require('fs')

module.exports = { parse, write }

function parse(options, rooms) {
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

  const roomsYaml = yaml.safeDump(rooms)
  const areaYaml = yaml.safeDump({
    title: areaTitle,
    info: areaInfo
  })

  return { roomsYaml, areaYaml }
}

// TODO: Test
function write(yaml, options) {
  const { roomsYaml, areaYaml } = yaml
  const {
    filepath = process.cwd()
  } = options

  fs.writeFileSync(filepath + 'manifest.yml', areaYaml)
  fs.writeFileSync(filepath + 'rooms.yaml', roomsYaml)
}