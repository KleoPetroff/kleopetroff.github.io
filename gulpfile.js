const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

// Minify and Concatenate all CSS files
gulp.task('sass', function (done) {
  gulp.src('assets/_scss/**/**.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));

  done();
});

// Watching for changes in all css files
gulp.task('watch', function () {
  gulp.watch('assets/_scss/**/*.scss', gulp.series('sass'));
});
