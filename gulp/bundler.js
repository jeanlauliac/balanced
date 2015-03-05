'use strict'

var babelify = require('babelify')
var browserify = require('browserify')
var common = require('./common')
var gulp = require('gulp')
var path = require('path')
var sourceStream = require('vinyl-source-stream')
var util = require('gulp-util')

var through2 = require('through2')

function bundler(filename) {
  var opts = { debug: false, cache: {}, packageCache: {}, fullPaths: true }
  var entry = './' + path.join(common.Folders.SOURCE, filename)
  return browserify(opts)
    //.add(es6ify.runtime)
    //.transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
    .transform(babelify)
    // .transform(function (file) {
    //   return through2(function (data, _, cb) {
    //     console.warn(data)
    //     this.push(data)
    //     cb()
    //   })
    // })
    .require(entry, { entry: true })
}

bundler.run = function bundleRun(bundler, filename) {
  util.log('Starting JS bundling...')
  return bundler.bundle()
    .on('error', function (err) {
      util.log(util.colors.red('Error: '), err.message)
    })
    .on('end', function () {
      util.log('Finished JS bundle.')
    })
    .pipe(sourceStream(filename))
    .pipe(gulp.dest(common.Folders.OUTPUT))
}

module.exports = bundler
