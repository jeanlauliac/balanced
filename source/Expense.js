'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

var Expense = {
  Record: new Immutable.Record({
    /**
     * A set of ID of people benefiting from the expense.
     */
    benefiters: new Immutable.Set(),
    /**
     * ID of the person who paid for the expense.
     */
    payer: null,
    /**
     * String describing the expense reason.
     */
    reason: null,
    /**
     * The value of the expense. The currency is agnostic (generally defined at
     * the report layer).
     */
    value: null,
  }, 'Expense'),

  /**
   * Make a new expense of the specified value.
   */
  ofValue(value, payer) {
    return new Expense.Record({ value, payer })
  }
}

module.exports = Expense
