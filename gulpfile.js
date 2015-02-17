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

// server
var serve = {
  script: "server.js",
  ignore: [paths.markup.src, paths.styles.files, paths.scripts.src]
};
 
// stylesheets
gulp.task('styles', function() {
  return sass(paths.styles.src, {
    style: "compressed",
    noCache:true,
    loadPath: [
      "./bower_components/bourbon/app/assets/stylesheets/",
      "./bower_components/neat/app/assets/stylesheets/"
    ]
  })
  .pipe(plumber({errorHandler: onError}))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(livereload({auto:false}));
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
  nodemon(serve);
});
 
// default task
gulp.task('default', ['watch','styles','scripts'], function() {
  nodemon(serve);
});