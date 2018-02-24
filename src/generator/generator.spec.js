const {expect} = require('chai')
const generator = require('../generator')

describe('Generator API signature', () => {
  it('is a function', () => {
    expect(generator).to.be.a('function')
  })
})
