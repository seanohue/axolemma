module.exports = {
  capitalize,
  resolveTrue,
  noop
}

function capitalize (string) {
  if (typeof string !== 'string' || !string.trim().length) return ''

  const [first, ...rest] = string
  return first.toUpperCase().concat(rest.join(''))
}

function resolveTrue () {
  return Promise.resolve(true)
}

function noop () {}
