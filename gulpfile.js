'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');
let del = require('del');
let browserSync = require('browser-sync').create();
let browserSyncTest = require('browser-sync').create();
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

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

gulp.task('serve-test-browser-sync', () => {
    browserSyncTest.init({
        server: {
            port: 3010,
            baseDir: "./"
        },
        logFileChanges: false
    });
});

gulp.task('exit-test-browser-sync', () => {
    browserSyncTest.exit();
});

function swallowError(error) {
    console.log(error.toString());

    this.emit('end');
}