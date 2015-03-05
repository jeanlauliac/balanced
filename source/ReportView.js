'use strict'

var ExpenseView = require('./ExpenseView')
var React = require('react')
var Report = require('./Report')

/**
 * Displays a single report.
 */
var ReportView = React.createClass({
  propTypes: {
    /**
     * The application data.
     */
    report: React.PropTypes.instanceOf(Report.Record),
  },

  render() {
    var report = this.props.report
    var expenses = report.expenses.toKeyedSeq().map((expense, id) => {
      return (
        <li key={id}><ExpenseView expense={expense} /></li>
      )
    }).toArray()
    return (
      <ul>
        {expenses}
      </ul>
    )
  },
})

module.exports = ReportView
