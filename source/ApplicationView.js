'use strict'

import Account from './Account'
import Application from './Application'
import Immutable from 'immutable'
import Expense from './Expense'
import ExpenseEditor from './ExpenseEditor'
import React from 'react'
import ReportView from './ReportView'
import transformify from './utils/transformify'

/**
 * Displays the whole application.
 */
var ApplicationView = React.createClass({
  propTypes: {
    /**
     * The application data.
     */
    initialApplication: React.PropTypes.instanceOf(Application),
  },

  getInitialState() {
    return {
      application: this.props.initialApplication,
    }
  },

  render() {
    if (this.state.application.creatingExpense) {
      return this._renderCreateExpense()
    }
    if (this.state.application.openExpenseId !== undefined) {
      return this._renderOpenExpense()
    }
    if (this.state.application.openReportId !== undefined) {
      return this._renderOpenReport()
    }
    return this._renderReports()
  },

  _saveOpenExpense(newExpense) {
    this.setState({
      application: this.state.application.saveOpenExpense(newExpense),
    })
  },

  _openExpense(id) {
    this.setState({
      application: this.state.application.set('openExpenseId', id)
        .set('creatingExpense', false),
    })
  },

  _openReport(id) {
    this.setState({
      application: this.state.application
        .set('openReportId', id)
        .set('openExpenseId', undefined),
    })
  },

  _renderCreateExpense() {
    var report = this.state.application.getOpenReport()
    return (
      <div>
        <p>
          <a href='#' onClick={this._openExpense.bind(this, undefined)}>
            Back
          </a>
        </p>
        <ExpenseEditor
          currency={report.currency}
          initialExpense={new Expense.Record({
            payer: '1',
            benefiters: new Immutable.Set(['1', '2', '3']),
          })}
          people={this.state.application.people}
          onSave={this._transforms.createExpense.bind(this)}
        />
      </div>
    )
  },

  _renderOpenExpense() {
    var report = this.state.application.getOpenReport()
    var expense = report.expenses.get(this.state.application.openExpenseId)
    return (
      <div>
        <p>
          <a href='#' onClick={this._openExpense.bind(this, undefined)}>
            Back
          </a>
        </p>
        <ExpenseEditor
          currency={report.currency}
          initialExpense={expense}
          people={this.state.application.people}
          onSave={this._saveOpenExpense}
        />
      </div>
    )
  },

  _renderOpenReport() {
    var report = this.state.application.getOpenReport()
    return (
      <div>
        <p><a
          href='#'
          onClick={this._openReport.bind(this, undefined)}>
          Back
        </a></p>
        <ReportView
          people={this.state.application.people}
          onCreateExpense={this._transforms.startCreatingExpense.bind(this)}
          onOpenExpense={this._openExpense}
          report={report}
        />
      </div>
    )
  },

  _renderReports() {
    var reportSeq = this.state.application.account.reports.toKeyedSeq()
    var reports = reportSeq.map((report, id) => {
      return (
        <li key={id}>
          <h2><a href='#' onClick={this._openReport.bind(this, id)}>
            {report.title}
          </a></h2>
        </li>
      )
    }).toArray()
    return (
      <div>
        <h1>Reports</h1>
        <ul>
          {reports}
        </ul>
      </div>
    )
  },

  _transforms: transformify('application', {
    startCreatingExpense: (app) => app.startCreatingExpense(),
    createExpense: (app, newExpense) => app.createExpense(newExpense),
  }),
})

module.exports = ApplicationView
