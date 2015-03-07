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
   * The value of the expense. The currency is agnostic (generally defined at
   * the report layer).
   */
  value: undefined,
}) {}

module.exports = Expense
