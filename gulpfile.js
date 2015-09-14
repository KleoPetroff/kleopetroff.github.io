var gulp    = require('gulp'),
    color   = require('cli-color'),
    plubmer = require('gulp-plumber'),
    sass    = require('gulp-sass');

// Minify and Concatenate all CSS files
gulp.task('sass', function() {
        gulp.src('assets/_scss/**/**.scss')
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(gulp.dest('assets/css'));
});

// Watching for changes in all css files
gulp.task('watch', function() {
    gulp.watch('assets/_scss/**/*.scss', ['sass']);
});
