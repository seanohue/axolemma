const findConfig = require('find-config')

module.exports = {

  /**
   * Gets config from files in the filesystem and returns it to be
   * merged with programmatic configs.
   * Priority is:
   * .axolemmaconfig.js
   * .axolemmaconfig.json (will be skipped in favor of .axolemmaconfig.js)
   * package.json
   */
  getOptions() {
    const configFinderOptions = {
      home: true,
      module: true
    }

    const axConfig = require(findConfig('.axolemmaconfig', configFinderOptions)) || {}
    const pkg = require(findConfig('package.json', configFinderOptions)) || {}
    console.log({axConfig, pkg})
    return Object.assign({},
      axConfig,
      pkg.axolemma || {}
    )
  }
}