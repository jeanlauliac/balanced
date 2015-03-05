'use strict'

var Expense = require('./Expense')
var React = require('react')

/**
 * Displays an expense.
 */
var ExpenseView = React.createClass({
  propTypes: {
    expense: React.PropTypes.instanceOf(Expense.Record),
  },

  render() {
    return (
      <p></p>
    )
  }
})

module.exports = ExpenseView
