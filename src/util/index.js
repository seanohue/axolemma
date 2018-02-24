module.exports = {
  capitalize
}

function capitalize(string) {
  if (typeof string !=='string' || !string.trim().length) return '';

  const [first, ...rest] = string;
  return first.toUpperCase().concat(rest.join(''))
}