const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('watch',['styles', 'scripts'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    //Watching changes on all html reloads browser
    watch('./app/*.html').on('change', browserSync.reload);

    //Watch changes on scss and run cssInject gulp task
    watch('./app/assets/styles/**/*.scss', () => {
        gulp.start('cssInject');
    });

    //watch changes on js files in assets trigger gulp task scriptsRefresh
    watch('./app/assets/scripts/**/*.js', () => {
        gulp.start('scriptsRefresh');
    });
});

//Waits for styles gulp task to finish then because our temp folder has the new css thanks to styles task we add it to stream
gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

//When triggered scriptsRefresh reload browserSync
gulp.task('scriptsRefresh',['scripts'], () => {
    browserSync.reload();
});