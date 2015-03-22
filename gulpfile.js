"use strict";

// dependencies
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    // uglify = require('gulp-uglify'),
    // rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');
 
// compile paths
var paths = {
  markup: { src:'./public/**/*.html' },
  styles: { src:'scss', files:'./scss/**/*.scss', dest:'./public/css' },
  scripts: { src: './public/js/app.js', dest:'./public/js', ext:'app.js'}
};
 
var watchPaths = [paths.markup.src, paths.scripts.src, paths.styles.src];
 
// function for error handling
var onError = function(err) {  
  gutil.beep();
  console.log(err);
};
 
// stylesheets
gulp.task('styles', function() {
  return sass(paths.styles.src, {
    style: "compressed",
    noCache:true,
    loadPath: [
      "./public/libs/bourbon/app/assets/stylesheets/",
      "./public/libs/neat/app/assets/stylesheets/"
    ]
  })
  .pipe(plumber({errorHandler: onError}))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(livereload({auto:false}));
});
 
// scripts
// gulp.task('scripts', function() {
//   gulp.src(paths.scripts.src)
//   .pipe(plumber({errorHandler: onError}))
//   .pipe(uglify(paths.scripts.src))
//   .pipe(rename(paths.scripts.ext))
//   .pipe(gulp.dest(paths.scripts.dest))
//   .pipe(livereload());
// });
 
// watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.styles.files, ['styles']);
  // gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch([paths.markup.src, paths.scripts.src]).on('change', livereload.changed);
});
 
// default task
gulp.task('default', ['watch', 'styles']);