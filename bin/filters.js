module.exports = {
  toInteger (input) {
    return parseInt(input, 10)
  },
  toPercentage (input) {
    if (input < 1) {
      return input
    }
    return input / 100
  },
  toArrayOfNumbers (input) {
    return input.split(',')
      .map(s => parseInt(s.trim(), 10))
  }
}
