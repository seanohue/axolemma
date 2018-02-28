module.exports = {
  isAlphanumeric(input) {
    const alphanumeric = /^[0-9a-zA-Z]+$/
    return Boolean(input.match(alphanumeric))
  }
}