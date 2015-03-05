'use strict'

var Application = require('./Application')
var ApplicationView = require('./ApplicationView')
var Account = require('./Account')
var React = require('react')
var exampleApp = require('./exampleApp')
var url = require('url')

;(function main() {
  var root = document.getElementById('root')
  var app = Application.empty()
  var urlData = url.parse(window.location.href, true)
  if (Boolean(Number(urlData.query.demo))) {
    app = exampleApp()
  }
  React.render(<ApplicationView initialApplication={app} />, root)
})()
