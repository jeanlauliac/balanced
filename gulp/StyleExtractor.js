'use strict'

var Absurd = require('absurd')
var falafel = require('falafel')
var fs = require('fs')
var path = require('path')
var through = require('through')

function StyleExtractor() {
  this.transform = this.transform.bind(this)
  this.clear()
}

StyleExtractor.prototype.clear = function () {
  this._fileStyles = {}
}

StyleExtractor.prototype.writeFile = function (filename, cb) {
  var ab = new Absurd()
  for (var styles in this._fileStyles) {
    ab.add(this._fileStyles[styles])
  }
  ab.compile(function (err, css) {
    if (err) {
      cb(err)
    }
    fs.writeFile(filename, css, function (err) {
      cb(err)
    })
  })
}

StyleExtractor.prototype.transform = function (filename) {
  var classPrefix = path.basename(filename).replace('.', '_') + '__'
  var source = ''
  var styleExtractor = this
  return through(function write(data) {
    source += data
  }, function end() {
    styleExtractor._fileStyles[filename] = {}
    var result = falafel(source, function (node) {
      if (!(
        node.type === 'CallExpression' &&
        node.callee.type === 'Identifier' &&
        node.callee.name === 'stylify'
      )) {
        return
      }
      var obj = eval('(' + node.arguments[0].source() + ')')
      if (node.arguments[1] != null) {
        var selector = JSON.parse(node.arguments[1].source())
        styleExtractor._fileStyles[filename][selector] = obj
        node.update('void 0')
      } else {
        var className = classPrefix + node.start
        styleExtractor._fileStyles[filename]['.' + className] = obj
        node.update('\'' + className + '\'')
      }
    }).toString()
    this.queue(result)
    this.queue(null)
  })
}

module.exports = StyleExtractor
