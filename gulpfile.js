const gulp = require('gulp');
const shell = require('gulp-shell');
const uglify = require('gulp-uglify');
const gzip = require('gulp-gzip');

gulp.task('compress', function() {
  return gulp.src(['./dist/**/*.*'])
    .pipe(gzip())
    .pipe(gulp.dest('./dist'));
});
// gulp.task('backend', shell.task(['java -jar ./server/serverstm-0.1-all.jar']))
//
// gulp.task('serve', () => {
//   return gulp.src('./').pipe(shell(['ng serve --open']))
// })
//
// gulp.task('default', gulp.parallel('backend', 'serve'))
