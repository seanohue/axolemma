module.exports = {
  isAlphanumeric(input) {
    const alphanumeric = /^[0-9a-zA-Z]+$/
    return Boolean(input.match(alphanumeric)) || 'Please enter an alphanumeric string.'
  },
  isNumber(input) {
    return !isNaN(parseInt(input, 10)) || 'Please enter a number.'
  }
}