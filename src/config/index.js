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
  getOptions () {
    const configFinderOptions = {
      home: true,
      module: true
    }

    const axConfigPath = findConfig('.axolemmaconfig', configFinderOptions);
    const pkgPath = findConfig('package.json', configFinderOptions);

    let axConfig = {}
    let pkg = {}
    if (axConfigPath) {
      axConfig = require(axConfigPath)
    }
    if (pkgPath) {
      pkg = require(pkgPath)
    }

    return Object.assign({},
      axConfig,
      pkg.axolemma || {}
    )
  }
}
