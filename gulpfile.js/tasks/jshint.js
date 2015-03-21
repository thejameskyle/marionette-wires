var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
  return gulp.src(['./src/**/*.js', './test/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});
