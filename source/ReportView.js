'use strict'

var ExpenseView = require('./ExpenseView')
var Immutable = require('immutable')
var React = require('react')
var Report = require('./Report')

/**
 * Displays a single report.
 */
var ReportView = React.createClass({
  propTypes: {
    people: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    onCreateExpense: React.PropTypes.func.isRequired,
    onOpenExpense: React.PropTypes.func.isRequired,
    report: React.PropTypes.instanceOf(Report),
  },

  render() {
    if (this.props.openExpenseId !== undefined) {
      return this._renderExpense()
    }
    return this._renderReport()
  },

  _renderReport() {
    var report = this.props.report
    var expenses = report.expenses.toKeyedSeq().map((expense, id) => {
      return (
        <li key={id}>
          <ExpenseView
            currency={report.currency}
            expense={expense}
            onRequestEdit={this.props.onOpenExpense.bind(this, id)}
            people={this.props.people}
          />
        </li>
      )
    }).toArray()
    return (
      <div>
        <h1>{report.title}</h1>
        <p><a href='#' onClick={this.props.onCreateExpense}>
          Add an expense
        </a></p>
        <ul>
          {expenses}
        </ul>
      </div>
    )
  },
})

module.exports = ReportView
