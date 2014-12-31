/* jshint node:true */

"use strict";

// dependencies
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');
 
// compile paths
var paths = {
  markup: { src:['./**/*.html','!./public/**/*'] },
  styles: { src:'scss', files:'scss/**/*.scss', dest:'./public/css' },
  scripts: { src: './public/js/main.js', dest:'./public/js', ext:'main.min.js'}
};
 
var watchPaths = [paths.markup.src, paths.styles.src, paths.scripts.src];
 
// function for error handling
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
      "./bower_components/neat/app/assets/stylesheets/"
    ],
    noCache: true,
    "sourcemap=none": true }))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(livereload());
});
 
// scripts
gulp.task('scripts', function() {
  gulp.src(paths.scripts.src)
  .pipe(plumber({errorHandler: onError}))
  .pipe(uglify(paths.scripts.src))
  .pipe(rename(paths.scripts.ext))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(livereload());
});
 
// watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.styles.files, ['styles']);
  gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch(watchPaths).on('change', livereload.changed);
  nodemon({
    script: "server.js",
    ignore: [paths.markup.src, paths.styles.files, paths.scripts.src]
  });
});
 
// default task
gulp.task('default', ['styles','scripts'], function() {
  nodemon({
    script: "server.js",
    ignore: [paths.markup.src, paths.styles.files, paths.scripts.src]
  });
});