var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var stylish = require('jshint-stylish');

var handleErrors = require('../util/handleErrors.js');

gulp.task('lint', function() {
	return gulp.src([config.js.all].concat(config.js.tests))//to add tests
    .pipe($.plumber())
		.pipe($.cached('hinting'), { optimizeMemory:true } )
		.pipe($.jshint())
		.pipe($.jshint.reporter(stylish))
		.pipe($.jshint.reporter('fail'))
		.on('error', handleErrors)
		.on('end', function() {
			// console.log('-->               Done linting');
		});
});
