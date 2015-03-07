'use strict'

var Currency = require('./Currency')
var Expense = require('./Expense')
var Immutable = require('immutable')
var React = require('react')
var invariant = require('./invariant')

/**
 * Let people edit an expense.
 */
var ExpenseEditor = React.createClass({
  propTypes: {
    currency: React.PropTypes.string.isRequired,
    initialExpense: React.PropTypes.instanceOf(Expense),
    people: React.PropTypes.instanceOf(Immutable.Map).isRequired,
  },

  getInitialState() {
    if (this.props.initialExpense === undefined) {
      return {
        reason: '',
        valueAsString: '',
      }
    }
    return {
      reason: this.props.initialExpense.reason,
      valueAsString: this.props.initialExpense.value.toString(),
    }
  },

  render() {
    var expense = this.state.expense
    var currencySymbol = Currency.symbolOf(this.props.currency)
    return (
      <form>
        <input
          onChange={this._onReasonChange}
          type='text'
          value={this.state.reason}
        />
        <p>
          <input
            onChange={this._onValueChange}
            type='number'
            value={this.state.valueAsString}
          />
          {currencySymbol}
        </p>
        <p><a href='#' onClick={this._onSave}>Save</a></p>
      </form>
    )
  },

  _onReasonChange(ev) {
    this.setState({
      reason: ev.target.value
    })
  },

  _onSave() {
    invariant(this.state.reason.length > 0, 'missing reason')
    var value = Number(this.state.valueAsString)
    invariant(!isNaN(value) && value > 0, 'invalid value')
    this.props.onSave(new Expense.Record({
      reason: this.state.reason,
      value: Number(this.state.valueAsString),
      payer: '1',
      benefiters: new Immutable.Set(['1', '2', '3']),
    }))
  },

  _onValueChange(ev) {
    this.setState({
      valueAsString: ev.target.value
    })
  }
})

module.exports = ExpenseEditor
