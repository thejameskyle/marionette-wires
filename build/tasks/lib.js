var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('lib', function() {
	var dist = config.release;
	return gulp.src(config.js.libs)
		.pipe($.concat(config.js.libBundle))
		.pipe($.if(!dist, $.sourcemaps.init({loadMaps: true})))
		.pipe($.if(dist, $.uglify()))
		.pipe($.if(!dist, $.sourcemaps.write('./')))
		.pipe(gulp.dest(config.js.dest));
});
