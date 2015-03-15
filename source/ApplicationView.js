'use strict'

import Account from './Account'
import Application from './Application'
import Frame from './abstract/navigation/Frame'
import Immutable from 'immutable'
import Expense from './Expense'
import ExpenseEditor from './ExpenseEditor'
import Navigator from './abstract/navigation/Navigator'
import React from 'react'
import ReportView from './ReportView'
import Tab from './abstract/navigation/Tab'
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
    return (
      <Navigator>
        {this._renderReportsFrame()}
        {this._renderOpenReportFrame()}
        {this._renderOpenExpenseFrame()}
      </Navigator>
    )
  },

  _renderOpenExpenseFrame() {
    if (this.state.application.creatingExpense) {
      return (
        <Frame onBackClick={this._openExpense.bind(this, undefined)}>
          <Tab title='Creating' isOpen={true}>
            {this._renderCreateExpense()}
          </Tab>
        </Frame>
      )
    }
    if (this.state.application.openExpenseId !== undefined) {
      return (
        <Frame onBackClick={this._openExpense.bind(this, undefined)}>
          <Tab title='Editing' isOpen={true}>
            {this._renderOpenExpense()}
          </Tab>
        </Frame>
      )
    }
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

  _goBack() {

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
          onSave={this._transforms.createExpense.bind(this)}
          people={this.state.application.people}
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

  _renderOpenReportFrame() {
    if (this.state.application.openReportId === undefined) {
      return
    }
    var report = this.state.application.getOpenReport()
    return (
      <Frame
        onBackClick={this._openReport.bind(this, undefined)}
        actionLabel='Create'
        onAction={this._transforms.startCreatingExpense.bind(this)}>
        <Tab title='Report' isOpen={true}>
          <ReportView
            people={this.state.application.people}
            onCreateExpense={this._transforms.startCreatingExpense.bind(this)}
            onOpenExpense={this._openExpense}
            report={report}
          />
        </Tab>
      </Frame>
    )
  },

  _renderReportsFrame() {
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
      <Frame><Tab title='Reports' isOpen={true}>
        <h1>Reports</h1>
        <ul>
          {reports}
        </ul>
      </Tab></Frame>
    )
  },

  _transforms: transformify('application', {
    startCreatingExpense: (app) => app.startCreatingExpense(),
    createExpense: (app, newExpense) => app.createExpense(newExpense),
  }),
})

module.exports = ApplicationView
