'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

class Account extends Immutable.Record({
  /**
   * Map IDs to each report in the account.
   */
  reports: new Immutable.Map(),
}) {
  saveExpense(reportId, expenseId, newExpense) {
    var report = this.reports.get(reportId);
    report = report.saveExpense(expenseId, newExpense)
    return this.set('reports', this.reports.set(reportId, report))
  }
}

/**
 * Make a new empty account.
 */
Account.empty = () => {
  return new Account()
}

module.exports = Account
