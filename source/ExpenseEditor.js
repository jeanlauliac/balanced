'use strict'

var Currency = require('./Currency')
var Expense = require('./Expense')
var Immutable = require('immutable')
var React = require('react')

/**
 * Let people edit an expense.
 */
var ExpenseEditor = React.createClass({
  propTypes: {
    currency: React.PropTypes.string.isRequired,
    initialExpense: React.PropTypes.instanceOf(Expense.Record).isRequired,
    people: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  },

  getInitialState() {
    return { expense: this.props.initialExpense }
  },

  render() {
    var expense = this.state.expense
    var currencySymbol = Currency.symbolOf(this.props.currency)
    var payerName = this.props.people.get(expense.payer).name
    var benefitersNames = expense.benefiters.map((id) =>
      this.props.people.get(id).name).toArray().join(', ')
    return (
      <form>
        <input
          onChange={this._onReasonChange}
          type='text'
          value={expense.reason}
        />
        <p>{expense.value} {currencySymbol}</p>
        <p>{payerName} paid for {benefitersNames}.</p>
        <p><a href='#' onClick={this._onSave}>Save</a></p>
      </form>
    )
  },

  _onReasonChange(ev) {
    this.setState({
      expense: this.state.expense.set('reason', ev.target.value)
    })
  },

  _onSave() {
    this.props.onSave(this.state.expense)
  },
})

module.exports = ExpenseEditor
