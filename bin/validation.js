module.exports = {
  isAlphanumeric(input) {
    const alphanumeric = /^[0-9a-zA-Z]+$/
    return input.match(alphanumeric)
  }
}