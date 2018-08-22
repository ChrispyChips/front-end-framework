const gulp = require('gulp');
const sass = require('gulp-sass');

//Compile sass into css and put it into temp folder
gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/temp/styles'));
});