var gulp = require('gulp');
var bundler = require('../lib/bundler');

gulp.task('scripts', function(cb) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  bundler(cb);
});
