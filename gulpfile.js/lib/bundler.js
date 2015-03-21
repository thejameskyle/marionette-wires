var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var _ = require('lodash');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var bundler = _.memoize(function(watch) {
  var options = {debug: true};

  if (watch) {
    _.extend({ debug: true }, watchify.args);
  }

  var b = browserify('./src/main.js', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

module.exports = function (cb, watch) {
  return bundler(watch).bundle()
    .on('error', $.util.log)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
    .pipe(reload({ stream: true }));
};
