var gulp = require('gulp');
var browserSync = require('browser-sync');
var bundler = require('../lib/bundler');
var api = require('../../api/api');

gulp.task('watch', ['build'], function(cb) {
  browserSync({
    server: {
      baseDir: 'dist',
      middleware: function(req, res, next) {
        api(req, res, next);
      }
    }
  });

  bundler(cb, true).on('update', function() {
    gulp.start('scripts');
    gulp.start('test');
  });
  gulp.watch('./test/**/*.js', ['test']);
  gulp.watch(['./src/main.less', './src/**/*.less'], ['styles']);
  gulp.watch(['./src/*.html'], ['html']);
});
