var gulp = require('gulp');

gulp.task('build', [
  'clean',
  'html',
  'styles',
  'scripts',
  'test'
]);
