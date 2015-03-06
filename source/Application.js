'use strict'

var Account = require('./Account')
var Immutable = require('immutable')
var invariant = require('./invariant')

/**
 * Root object of the application data, that contains everything else.
 */
var Application = {
  Record: new Immutable.Record({
    /**
     * The account currently displayed.
     */
    account: Account.empty(),
    /**
     * Map IDs to the currently known people.
     */
    people: new Immutable.Map(),
    /**
     * A report currently displayed, if any.
     */
    openReportId: undefined,
    /**
     * An expense currently displayed, if any.
     */
    openExpenseId: undefined,
  }, 'Account'),

  /**
   * Create an empty application.
   */
  empty() {
    return new Application.Record()
  },

  getOpenReport(app) {
    return app.account.reports.get(app.openReportId)
  },

  saveOpenExpense(app, newExpense) {
    var report = app.account.reports.get(app.openReportId);
    var expense = report.expenses.get(app.openExpenseId);
    invariant(expense !== undefined, 'cannot save unexisting expense')
    report = report.set(
      'expenses',
      report.expenses.set(app.openExpenseId, newExpense)
    )
    var reports = app.account.reports.set(app.openReportId, report)
    app = app.set('account', app.account.set('reports', reports))
    return app.set('openExpenseId', undefined)
  },
}

module.exports = Application
