var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('mocha', ['lint'], function() {
  return gulp.src(config.js.tests, { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: config.reporter }));
});
