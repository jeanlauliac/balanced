'use strict';

var bundler = require('./gulp/bundler')
var changed = require('gulp-changed')
var common = require('./gulp/common')
var connect = require('gulp-connect')
var gulp = require('gulp')
var merge = require('merge-stream')
var pipe = require('multipipe')
var path = require('path')
var rename = require('gulp-rename')
var util = require('gulp-util')
var watchify = require('watchify')

gulp.task('default', ['all'])
gulp.task('dev', ['all', 'watch', 'serve'])
gulp.task('all', ['bundle', 'html'])

gulp.task('bundle', function () {
  return bundler.run(bundler('index.js'), 'bundle.js');
})

gulp.task('html', html)
function html() {
  return pipe(
    source('*.html'),
    changed(common.Folders.OUTPUT),
    gulp.dest(common.Folders.OUTPUT)
  )
}

gulp.task('watch', function() {
  var w = watchify(bundler('index.js'))
  bundler.run(w, 'bundle.js')
  w.on('update', function onUpdate() {
    return bundler.run(w, 'bundle.js')
      .pipe(connect.reload())
  })
  gulp.watch('source/*.html', function () {
    return pipe(html(), connect.reload()).on('error', logError)
  })
})

gulp.task('serve', function() {
  return connect.server({
    root: 'output',
    livereload: true,
  })
})

function logError (err) {
  util.log(err.toString())
}

function source(filename) {
  return gulp.src(path.join(common.Folders.SOURCE, filename))
}
