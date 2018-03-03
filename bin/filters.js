module.exports = {
  integer(input) {
    return parseInt(input, 10);
  },
  percentage(input) {
    if (input < 1) {
      return input
    }
    return input / 100
  }
}