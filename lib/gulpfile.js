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
    './polyfills/flexibility/flexibility.min.js',
    './polyfills/respond/respond.min.js'
  ]
}

gulp.task('_build.site', () => {
  return gulp.src('site/site.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .on('error', swallowError)
    .pipe(rename('site.min.css'))
    .pipe(gulp.dest('./site'));
});

gulp.task('_build.app-js', () => {
  return gulp.src(CONFIG.polyfills)
    .pipe(concat('polyfills.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build--dev', ['_build.site', '_build.app-js'], () => {
  return gulp.src('src/blueprint.scss')
    .pipe(sass())
    .on('error', swallowError)
    .pipe(rename('blueprint.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build--dev'], () => {
  return gulp.src('src/blueprint.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .on('error', swallowError)
    .pipe(rename('blueprint.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', done => {
  del([
    './dist/**/*'
  ], done);
});

gulp.task('watch', ['_browser-sync'], () => {
  gulp.watch('./src/**/*.scss', ['build']);
  gulp.watch('./site/**/*.scss', ['build']);
});

gulp.task('_browser-sync-reload', () => {
  browserSync.reload();
});

gulp.task('_browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./site"
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