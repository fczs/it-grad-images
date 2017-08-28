'use strict';

var gulp    = require('gulp'),
    min     = require('gulp-imagemin'),
    image   = require('gulp-image'); // better result

gulp.task('min', function() {
    gulp.src('src/**/*')
        .pipe(min())
        .pipe(gulp.dest('dest-min'))
});

gulp.task('image', function () {
    gulp.src('src/**/*')
        .pipe(image({
            zopflipng: false
        }))
        .pipe(gulp.dest('dest-image'));
});

gulp.task('default', ['image']);