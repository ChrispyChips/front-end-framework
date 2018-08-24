const gulp = require('gulp');
const del = require('del');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const yargs = require('yargs');

const baseDir = (yargs.argv.dist ? 'dist' : (yargs.argv.docs ? 'docs' : 'docs'));
//To preview compiled dist folder run gulp previewDist
gulp.task('previewDist', () => {

    browserSync.init({
        notify: false,
        server: {
            baseDir: baseDir
        }
    });
});

//Deletes the old version of docs folder assuming there is one
gulp.task('deleteDistFolder', () => {
    del('./docs');
    del('./dist');
    return true;
});

gulp.task('copyGeneralFiles',['deleteDistFolder'], () => {
    let pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**',
    ];
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./'+baseDir));
});

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger',['deleteDistFolder'],()=>{
    gulp.start('usemin');
});

gulp.task('usemin',['styles', 'scripts'], () => {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [() => {return rev()}, () => {return cssnano()}],
            js: [()=> {return rev()}, ()=> {return uglify()}]
        }))
        .pipe(gulp.dest('./'+baseDir));
});

gulp.task('build',['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);