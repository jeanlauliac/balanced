'use strict'

var StyleExtractor = require('./StyleExtractor')
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
  var styleExtractor = new StyleExtractor()
  var bundle = browserify(opts)
    .transform(babelify)
    .transform(styleExtractor.transform)
    .require(entry, { entry: true })
  // HACK :(
  bundle.__styleExtractor = styleExtractor
  return bundle
}

bundler.run = function bundleRun(bundler, filename) {
  util.log('Starting JS bundling...')
  return bundler.bundle()
    .on('error', function (err) {
      util.log(util.colors.red('Error: '), err.message)
    })
    .on('end', function () {
      var cssFile = path.join(common.Folders.OUTPUT, 'extract.css')
      bundler.__styleExtractor.writeFile(cssFile, function (err) {
        if (err) {
          util.error(err)
          return
        }
        util.log('Finished CSS extraction.')
      })
      util.log('Finished JS bundle.')
    })
    .pipe(sourceStream(filename))
    .pipe(gulp.dest(common.Folders.OUTPUT))
}

module.exports = bundler
