'use-strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

const CONFIG = {
    polyfills: [
        './assets/js/flexibility/flexibility.min.js', 
        './assets/js/respond/respond.min.js'
    ]
}

gulp.task('_build.app', () => {
    return gulp.src('assets/app.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', swallowError)
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./assets'));
});

gulp.task('_build.app-js', () => {
    return gulp.src(CONFIG.polyfills)
        .pipe(concat('polyfills.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build--dev', ['_build.app', '_build.app-js'], () => {
    return gulp.src('src/core-flex-grid.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(rename('core-flex-grid.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build--dev'], () => {
    return gulp.src('src/core-flex-grid.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', swallowError)
        .pipe(rename('core-flex-grid.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', done => {
    del([
        './dist/**/*'
    ], done);
});

gulp.task('watch', ['_browser-sync'], () => {
    gulp.watch('./src/**/*.scss', ['build']);
    gulp.watch('./assets/**/*.scss', ['build']);
});

gulp.task('_browser-sync-reload', () => {
    browserSync.reload();
});

gulp.task('_browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        logFileChanges: false
    });
});

function swallowError(error) {
    console.log(error.toString());

    this.emit('end');
}