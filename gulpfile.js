var gulp    = require('gulp'),
    minify  = require('gulp-minify-css'),
    concat  = require('gulp-concat-css'),
    color   = require('cli-color'),
    plubmer = require('gulp-plumber');


// Minify and Concatenate all CSS files
gulp.task('css', function() {
    gulp.src('css/*.css')
        .pipe(plubmer())
        .pipe(concat('bundle.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('assets/css'));
    console.log(color.bold.blue.underline('Concatenation and Minification Successful :)'));
});


// Watching for changes in all css files
gulp.task('watch', function() {
    gulp.watch('css/*.css', ['css']);
});