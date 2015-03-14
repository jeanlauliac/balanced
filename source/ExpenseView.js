'use strict'

var Currency = require('./Currency')
var Expense = require('./Expense')
var Immutable = require('immutable')
var React = require('react')
import stylify from './utils/stylify'

var EXPENSE_CLASS = stylify({
  border: '1px solid #d00',
})

/**
 * Displays an expense.
 */
var ExpenseView = React.createClass({
  propTypes: {
    currency: React.PropTypes.string.isRequired,
    expense: React.PropTypes.instanceOf(Expense).isRequired,
    onRequestEdit: React.PropTypes.func.isRequired,
    people: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  },

  render() {
    var expense = this.props.expense
    var currencySymbol = Currency.symbolOf(this.props.currency)
    var payerName = this.props.people.get(expense.payer).name
    var benefitersNames = expense.benefiters.map((id) =>
      this.props.people.get(id).name).toArray().join(', ')
    return (
      <div className={EXPENSE_CLASS}>
        <p>{expense.reason}, {expense.value} {currencySymbol}</p>
        <p>{payerName} paid for {benefitersNames}.</p>
        <p><a href='#' onClick={() => this.props.onRequestEdit()}>Edit</a></p>
      </div>
    )
  },
})

module.exports = ExpenseView
