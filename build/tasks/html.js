var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('html', function() {
	// preprocess for ifdefs
	gulp.src(config.html.src)
    .pipe($.plumber())
		.pipe($.preprocess({context: {DEV: !config.release, DIST: config.release}}))
		.pipe(gulp.dest(config.html.dest))
    .pipe($.if(!config.release,reload({ stream: true })))
  ;
});
