'use strict'

var Currency = require('./Currency')
var Expense = require('./Expense')
var Immutable = require('immutable')
var React = require('react')

/**
 * Displays an expense.
 */
var ExpenseView = React.createClass({
  propTypes: {
    currency: React.PropTypes.string.isRequired,
    expense: React.PropTypes.instanceOf(Expense.Record).isRequired,
    people: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  },

  render() {
    var expense = this.props.expense
    var currencySymbol = Currency.symbolOf(this.props.currency)
    var payerName = this.props.people.get(expense.payer).name
    var benefitersNames = expense.benefiters.map((id) =>
      this.props.people.get(id).name).toArray().join(', ')
    return (
      <div>
        <p>{expense.reason}, {expense.value} {currencySymbol}</p>
        <p>{payerName} paid for {benefitersNames}.</p>
      </div>
    )
  },
})

module.exports = ExpenseView
