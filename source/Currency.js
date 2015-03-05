var enumerate = require('./utils/enumerate')

var Currency = enumerate('CURRENCY', {
  EUR: undefined,
  GBP: undefined,
  USD: undefined,
})

Currency.symbolOf = (() => {
  var symbols = new Map([
    [Currency.EUR, '€'],
    [Currency.GBP, '£'],
    [Currency.USD, '$'],
  ])
  return (curr) => symbols.get(curr)
})()

module.exports = Currency
