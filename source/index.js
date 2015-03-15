'use strict'

var Application = require('./Application')
var ApplicationView = require('./ApplicationView')
var Account = require('./Account')
var React = require('react')
var exampleApp = require('./exampleApp')
var url = require('url')

stylify({
  fontFamily: "'Open Sans', sans-serif",
  fontSize: '100%/1.4',
  margin: 0,
  padding: 0,
}, 'body')

stylify({
  fontWeight: 'normal',
}, 'h1, h2, h3, h4, h5, h6')

;(function main() {
  var root = document.getElementById('root')
  var app = Application.empty()
  var urlData = url.parse(window.location.href, true)
  if (Boolean(Number(urlData.query.demo))) {
    app = exampleApp()
  }
  React.render(<ApplicationView initialApplication={app} />, root)
})()
