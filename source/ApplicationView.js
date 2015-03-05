'use strict'

var Account = require('./Account')
var Application = require('./Application')
var Immutable = require('immutable')
var React = require('react')
var ReportView = require('./ReportView')

/**
 * Displays the whole application.
 */
var ApplicationView = React.createClass({
  propTypes: {
    /**
     * The application data.
     */
    initialApplication: React.PropTypes.instanceOf(Application.Record),
  },

  getInitialState() {
    return {
      application: this.props.initialApplication,
    }
  },

  render() {
    if (this.state.application.openReportId === undefined) {
      return this._renderReports()
    }
    return this._renderOpenReport()
  },

  _closeReport() {
    this.setState({
      application: this.state.application.set('openReportId', undefined)
    })
  },

  _openReport(id) {
    this.setState({
      application: this.state.application.set('openReportId', id),
    })
  },

  _renderOpenReport() {
    var report = Application.getOpenReport(this.state.application)
    return (
      <div>
        <p><a href='#' onClick={this._closeReport}>Back</a></p>
        <ReportView report={report} />
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
})

module.exports = ApplicationView