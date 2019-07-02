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
    rooms,
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

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filepath)) {
      console.log('Making dir ', filepath);
      return fs.mkdir(filepath, 0744, (err) => {
        console.log('Made...', err || 'Success');
        if (err) return reject(err)
        writeFiles()
      })
    }

    writeFiles()

    function writeFiles() {
      fs.writeFile(filepath + '/manifest.yml', areaYaml, (err) => {
        console.log('Wrote area...', err || 'Success');

        if (err) return reject(err)
        fs.writeFile(filepath + '/rooms.yml', roomsYaml, (_err) => {
          console.log('Wrote rooms...', _err || 'Success');
          if (_err) return reject(_err)
          console.log('Done!')
          return resolve()
        })
      })
    }
  })
}
