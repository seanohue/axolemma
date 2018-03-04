module.exports = {
  integer(input) {
    return parseInt(input, 10);
  },
  percentage(input) {
    if (input < 1) {
      return input
    }
    return input / 100
  },
  toArrayOfNumbers(input) {
    return input.split(',')
      .map(s => parseInt(s.trim(), 10))
  }
}