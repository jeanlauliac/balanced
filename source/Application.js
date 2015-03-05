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
}

module.exports = Application
