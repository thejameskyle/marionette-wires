var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./dist'));
});
