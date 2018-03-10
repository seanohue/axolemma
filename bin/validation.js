module.exports = {
  isAlphanumeric, isNumber, isMapType, isPositiveNumber, isPercentage
}

function isAlphanumeric (input) {
  const alphanumeric = /^[0-9a-zA-Z]+$/
  return Boolean(input.match(alphanumeric)) || 'Please enter an alphanumeric string.'
}

function isNumber (input) {
  return !isNaN(parseInt(input, 10)) || 'Please enter a number.'
}

function isMapType (...types) {
  return (answers) => types.includes(answers.type)
}

function isPositiveNumber (input) {
  return (isNumber(input) === true && input >= 1) || 'Please enter a positive number.'
}

function isPercentage (input) {
  const isDecimalPercentage = (input > 0 && input < 1)
  const isIntegerPercentage = (isPositiveNumber(input) === true) && input <= 99
  return isDecimalPercentage || isIntegerPercentage ||
    'Please enter a percentage value (e.g., 0.25 or 25 both mean 25%).'
}
