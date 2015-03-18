var gulp = require('gulp');

//var runSequence = require('run-sequence');

gulp.task('banner', function() {
  console.log('_________________________________________');
  console.log('');
  console.log('-->    Building for: ' + (config.release ? 'distribution' : 'development') + ' (' + (config.debug ? 'uncompressed and w/' : 'compressed and w/o') + ' source maps)');
  console.log('');
});


//gulp.task('build', ['clean'], function(cb) {
//  runSequence(['images', 'lib', 'less', 'code', 'html', 'lint', 'test'])
//});

gulp.task('build', ['banner', 'clean', 'images', 'lib', 'less', 'scripts', 'html', 'test']);

gulp.task('enableWatch', function() {
  config.release = false;
});

gulp.task('disableDebug', function() {
  config.debug = false;
});

gulp.task('dist', ['disableDebug', 'build']);

gulp.task('watch', ['enableWatch', 'build', 'watchFiles']);
gulp.task('default', ['watch']);
