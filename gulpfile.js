var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('build.app', function () {
    return gulp.src('assets/app.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', swallowError)
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./assets'));
});

gulp.task('build.dev', function () {
    return gulp.src('src/core-flex-grid.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', swallowError)
        .pipe(rename('core-flex-grid.min.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build.dev', 'build.app'], function () {
    return gulp.src('src/core-flex-grid.scss')
    .pipe(sass())
    .on('error', swallowError)
    .pipe(rename('core-flex-grid.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function (done) {
    del([
        './dist/**/*'
    ], done);
});

gulp.task('watch', function () {
    gulp.watch('./src/**/*.scss', ['build']);
    gulp.watch('./assets/**/*.scss', ['build']);
});

function swallowError(error) {
    console.log(error.toString());

    this.emit('end');
}