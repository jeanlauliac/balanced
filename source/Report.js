'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

/**
 * A report represents a consistent set of expenses, and a set of people.
 */
var Report = {
  Record: new Immutable.Record({
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
  }, 'Report'),

  empty() {
    return new Report.Record()
  },

  addExpense(report, expense) {
    invariant(report.constructor.name === 'Report')
    return report.set('expenses', report.expenses.add(expense))
  },
}

module.exports = Report
