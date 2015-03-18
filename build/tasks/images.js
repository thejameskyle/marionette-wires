var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function() {
	return gulp.src(config.images.src)
		.pipe($.cached('images'), {optimizeMemory:true})
		.pipe($.imagemin()) // Optimize
		.pipe(gulp.dest(config.images.dest));
});
