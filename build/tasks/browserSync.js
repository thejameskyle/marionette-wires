var browserSync = require('browser-sync');
var gulp = require('gulp');

var api = require('../../api/api');

gulp.task('browserSync', ['build'], function() {
  var cfg = config.browserSync;
  cfg.middleware = function(req, res, next) {
    api(req, res, next);
  };
  browserSync(cfg);
});
