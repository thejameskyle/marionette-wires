var gulp = require('gulp');
var tools = require('../util/tools.js');

gulp.task('clean', function() {
  return tools.remove(config.html.dest, function() {
    //console.log('-->              Project cleaned!');
  });
});
