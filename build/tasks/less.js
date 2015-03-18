var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var handleErrors = require('../util/handleErrors.js');
var tools = require('../util/tools.js');

gulp.task('less', function() {
	tools.copy(config.less.cssLib, config.less.dest);

	return gulp.src(config.less.src)
		.pipe($.less())
    .pipe($.recess())
    .pipe($.recess.reporter( {fail: false, minimal: true}))
    .pipe($.if(config.debug, $.sourcemaps.init()))
		.on('error', handleErrors)
		.pipe($.autoprefixer())
    .pipe($.rename(config.less.bundle))
		.pipe($.if(config.debug, $.sourcemaps.write('./')))
    .pipe($.if(!config.debug, $.minifyCss( {keepSpecialComments: 0} )))
		.pipe(gulp.dest(config.less.dest))
    .pipe($.if(!config.release, reload({ stream: true })));
  ;
});
