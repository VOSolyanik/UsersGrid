'use strict';
var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var del = require('del');

var config = require('./config.json');

gulp.task('default', ['dist', 'js:watch', 'css:watch', 'templates:watch', 'copy:watch', 'webserver']);

gulp.task('dist', ['clean', 'copy', 'fonts', 'vendor', 'js', 'css', 'templates']);

gulp.task('clean', function (cb) {
    del.sync([config.bases.dist + '/**/*.*'], {force: true});
    cb();
});

gulp.task('fonts', function () {
    return gulp.src(config.path.fonts)
        .pipe(gulp.dest(config.bases.dist+'fonts/'));
});

gulp.task('copy', function () {
    return gulp.src(config.path.copy)
        .pipe(gulp.dest(config.bases.dist));
});

gulp.task('copy:watch', function () {
    gulp.watch(config.path.copy, ['copy']);
});

gulp.task('js', function () {
    gulp.src(config.path.scripts)
        .pipe(plug.sourcemaps.init())
        .pipe(plug.plumber())
        .pipe(plug.concat('app.js'))
        // .pipe(plug.uglify())
        .pipe(plug.sourcemaps.write('../maps'))
        .pipe(gulp.dest(config.bases.dist + 'js'));
});

gulp.task('js:watch', function () {
    gulp.watch(config.path.scripts, ['js']);
});

gulp.task('css', function () {
    gulp.src(config.path.sass.src)
        .pipe(plug.sourcemaps.init())
        .pipe(plug.plumber())
        .pipe(plug.sass(config.path.sass.conf))
        .pipe(plug.sourcemaps.write('../maps'))
        .pipe(gulp.dest(config.bases.dist + 'css'));
});

gulp.task('css:watch', function () {
    gulp.watch(config.path.sass.watch, ['css']);
});

gulp.task('templates', function() {
    gulp.src(config.path.html)
        .pipe(plug.angularTemplatecache('app.tpls.js', {
            module: 'app.tpls',
            standalone: true
        }))
        .pipe(gulp.dest(config.bases.dist + 'js'));
});

gulp.task('templates:watch', function () {
    gulp.watch(config.path.html, ['templates']);
});

gulp.task('vendor', ['vendor:js', 'vendor:css'], function() {
    return gulp.src(config.bases.src + 'index.html')
        .pipe(plug.inject(gulp.src([
            config.bases.dist + 'js/app.vendor.js',
            config.bases.dist + 'css/app.vendor.css'
        ]), {
            name: 'vendor',
            ignorePath: '/dist/'
        }))
        .pipe(gulp.dest(config.bases.dist));
});

gulp.task('vendor:js', function() {
    return gulp.src(config.path.libs)
        .pipe(plug.sourcemaps.init())
        .pipe(plug.concat('app.vendor.js'))
        .pipe(plug.uglify())
        .pipe(plug.sourcemaps.write('../maps'))
        .pipe(gulp.dest(config.bases.dist + 'js'));
});

gulp.task('vendor:css', function() {
    return gulp.src(config.path.css_libs)
        .pipe(plug.concat('app.vendor.css'))
        .pipe(gulp.dest(config.bases.dist + 'css'));
});

gulp.task('webserver', ['vendor'], function() {
  gulp.src('./dist/')
    .pipe(plug.webserver({
      livereload: true,
      open: true
    }));
});