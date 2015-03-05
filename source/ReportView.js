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
    /**
     * The application data.
     */
    report: React.PropTypes.instanceOf(Report.Record),
  },

  render() {
    var report = this.props.report
    var expenses = report.expenses.toKeyedSeq().map((expense, id) => {
      return (
        <li key={id}>
          <ExpenseView
            currency={report.currency}
            expense={expense}
            people={this.props.people}
          />
        </li>
      )
    }).toArray()
    return (
      <div>
        <h1>{report.title}</h1>
        <ul>
          {expenses}
        </ul>
      </div>
    )
  },
})

module.exports = ReportView
