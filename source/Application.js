'use strict'

var Account = require('./Account')
var Immutable = require('immutable')
var invariant = require('./invariant')

/**
 * Root object of the application data, that contains everything else.
 */
class Application extends Immutable.Record({
  /**
   * The account currently displayed.
   */
  account: Account.empty(),
  /**
   * Are we currently creating an expense?
   */
  creatingExpense: false,
  /**
   * Next sequence number for generating local IDs.
   */
  idSeq: 1,
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
}) {
  createExpense(newExpense) {
    var { application, id } = this.generateID()
    var account = this.account.saveExpense(this.openReportId, id, newExpense)
    return application.withMutations((app) =>
      app.set('account', account).set('creatingExpense', false)
    )
  }

  /**
   * Generate a local ID unique to the application.
   */
  generateID() {
    invariant(this.idSeq < Number.MAX_SAFE_INTEGER, 'too many local ids')
    return {
      application: this.set('idSeq', this.idSeq + 1),
      id: 'local_' + this.idSeq.toString(),
    }
  }

  getOpenReport() {
    return this.account.reports.get(this.openReportId)
  }

  saveOpenExpense(newExpense) {
    var app = this.set('account', this.account.saveExpense(
      this.openReportId,
      this.openExpenseId,
      newExpense)
    )
    return app.set('openExpenseId', undefined)
  }

  startCreatingExpense() {
    invariant(this.openReportId !== undefined, 'cannot create expense without report')
    invariant(!this.creatingExpense, 'already creating an expense')
    return this.withMutations((app) =>
      app.set('creatingExpense', true).set('openExpenseId', undefined)
    )
  }
}

/**
 * Create an empty application.
 */
Application.empty = () => {
  return new Application()
}

module.exports = Application
