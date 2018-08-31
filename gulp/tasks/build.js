const gulp = require('gulp');
const del = require('del');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const yargs = require('yargs');
const fs = require('fs');

const baseDir = (yargs.argv.dist ? 'dist' : (yargs.argv.docs ? 'docs' : 'docs'));

const distFolderTester = () => {
    try {
        const filedata = fs.readFileSync('./docs/index.html', 'utf8');
        if(filedata.length > 0){
            return './docs'
        }
    } catch (error) {
        return './dist'
    }
};

//To preview compiled dist folder run gulp previewDist
gulp.task('previewDist', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: distFolderTester()
        }
    });
});

//Deletes the old version of docs folder assuming there is one
gulp.task('deleteDistFolder', () => {
    del('./docs');
    del('./dist');
    return true;
});

gulp.task('copyGeneralFiles',['deleteDistFolder', 'optimizeImages'], () => {
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
        .pipe(gulp.dest('./'+baseDir+'/assets/images'));
});

gulp.task('useminTrigger',['deleteDistFolder'],()=>{
    gulp.start('usemin');
});

gulp.task('usemin',['deleteDistFolder','styles', 'scripts'], () => {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [() => {return rev()}, () => {return cssnano()}],
            js: [()=> {return rev()}, ()=> {return uglify()}]
        }))
        .pipe(gulp.dest('./'+baseDir));
});

gulp.task('build',['deleteDistFolder','optimizeImages','copyGeneralFiles','useminTrigger']);