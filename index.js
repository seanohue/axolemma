const ROT = require('rot-js');

if (!ROT.isSupported()) {
  throw new Error('ROT-JS is not supported on this platform.');
}

const generator = require('./src/generator');
generator();