'use strict'

var Immutable = require('immutable')
var invariant = require('./invariant')

var Account = {
  Record: new Immutable.Record({
    /**
     * Map IDs to each report in the account.
     */
    reports: new Immutable.Map(),
  }, 'Account'),

  /**
   * Make a new empty account.
   */
  empty() {
    return new Account.Record()
  }
}

module.exports = Account
