'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

/**
 * A report represents a consistent set of expenses, and a set of people.
 */
class Report extends Immutable.Record({
  /**
   * Currency used by the expenses.
   */
  currency: null,
  /**
   * A set of the report's expenses.
   */
  expenses: new Immutable.Map(),
  /**
   * A set of ID of the people involved in the report.
   */
  people: new Immutable.Set(),
  /**
   * Title of the report, only for display purposes. This can be used to
   * identify the report easily.
   */
  title: null,
}) {
  saveExpense(id, newExpense) {
    var expenses = this.expenses.set(id, newExpense)
    return this.set('expenses', expenses)
  }
}

module.exports = Report
