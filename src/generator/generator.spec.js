const {expect} = require('chai')
const generator = require('../generator')

describe('Area generator', () => {
  describe('Generator API signature', () => {
    it('is a function', () => {
      expect(generator).to.be.a('function')
    })

    it('should return an object with certain props', () => {
      const generated = generator({writeToFile: false})
      expect(generated.graphic).to.be.a('string')
      expect(generated.rooms).to.be.an('array')
    })
  })

  describe('Generator Error checking', () => {
    it('should check against invalid map types', () => {
      const badMap = () => generator({writeToFile: false, type: 'Potato'})
      expect(badMap).to.throw
    })
  })
})

