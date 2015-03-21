var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('mocha', ['jshint'], function() {
  return gulp.src([
    './test/setup/node.js',
    './test/setup/helpers.js',
    './test/unit/**/*.js'
  ], { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: 'spec' }));
});
