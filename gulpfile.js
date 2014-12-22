"use strict";

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');
 
var paths = {
  markup: { src:'./public/*.html' },
  styles: { src:'scss', files:'scss/**/*.scss', dest:'./public/css' },
  scripts: { src: ['./public/js/app.js','./public/js/main.js'], dest:'./public/js', ext:'main.min.js'}
};
 
var watchPaths = [paths.markup.src, paths.styles.src, paths.scripts.src];
 
var onError = function(err) {  
  gutil.beep();
  console.log(err);
};
 
// stylesheets
gulp.task('styles', function() {
  gulp.src(paths.styles.files)
  .pipe(plumber({errorHandler: onError}))
  .pipe(sass({
    style: 'compressed',
    loadPath: [
      "./bower_components/bourbon/dist/",
      "./bower_components/neat/app/assets/stylesheets/",
      "./bower_components/normalize.css/"
    ],
    noCache: true,
    "sourcemap=none": true }))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(livereload({ auto: false }));
});
 
// scripts
gulp.task('scripts', function() {
  gulp.src(paths.scripts.src)
  .pipe(plumber({errorHandler: onError}))
  .pipe(uglify())
  .pipe(concat("all.js"))
  .pipe(rename(paths.scripts.ext))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(livereload({ auto: false }));
});
 
// watch
gulp.task('watch', function() {
});
 
// default task
gulp.task('default', ['styles','scripts'], function() {
  livereload.listen();
  gulp.watch(paths.markup.src, ['']);
  gulp.watch(paths.styles.files, ['styles']);
  gulp.watch([paths.scripts.src], ['scripts']);
  gulp.watch(watchPaths).on('change', livereload.changed);
  nodemon({
    script: "server.js",
    ignore: [paths.markup.src, paths.styles.files, paths.scripts.src]
  });
});