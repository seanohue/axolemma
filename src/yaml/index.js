const yaml = require('js-yaml')

module.exports = { parse, write }

function parse(options, rooms) {
  if (!rooms || !rooms.length) {
    throw new Error('Attempted to parse an empty area.')
  }

  const {
    areaName = 'Generated Area',
    areaInfo = { respawnInterval: 60 }
  } = options

  if (typeof areaInfo !== 'object') {
    throw new Error('Invalid area info field.')
  }

  const roomsYaml = yaml.safeDump(rooms)
  const areaYaml = yaml.safeDump({
    title: areaName,
    info: areaInfo
  })

  return { roomsYaml, areaYaml }
}

function write() {}