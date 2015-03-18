var gulp = require('gulp');

gulp.task('watchFiles', ['browserSync'], function() {
  config.reporter = 'dot';

  gulp.watch(config.js.allTests, ['test']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch([config.less.src, config.less.all], ['styles']);
  gulp.watch([config.html.all], ['html']);
});
