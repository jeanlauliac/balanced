'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

class Expense extends Immutable.Record({
  /**
   * A set of ID of people benefiting from the expense.
   */
  benefiters: new Immutable.Set(),
  /**
   * ID of the person who paid for the expense.
   */
  payer: undefined,
  /**
   * String describing the expense reason.
   */
  reason: undefined,
  /**
   * UNIX time offset (milliseconds since the Epoch).
   */
  timeOffset: undefined,
  /**
   * The value of the expense. The currency is agnostic (generally defined at
   * the report layer).
   */
  value: undefined,
}) {
  constructor(opts) {
    invariant(Expense.areValidOptions(opts), 'invalid options')
    super(opts)
  }
}

Expense.isValidReason = (reason) =>
  typeof reason === 'string' && reason.length > 0

Expense.isValidValue = (value) =>
  typeof value === 'number' && !isNaN(value) && value > 0

Expense.isValidPayer = (payer) =>
  typeof payer === 'string' && payer.length > 0

Expense.isValidBenefiters = (benefiters) =>
  benefiters instanceof Immutable.Set &&
  benefiters.every((b) => typeof b === 'string' && b.length > 0)

Expense.areValidOptions = (opts) =>
  Expense.isValidReason(opts.reason) &&
  Expense.isValidValue(opts.value) &&
  Expense.isValidPayer(opts.payer) &&
  Expense.isValidBenefiters(opts.benefiters)

module.exports = Expense
