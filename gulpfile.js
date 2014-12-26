"use strict";

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

var onError = function(err) {  
  gutil.beep();
  console.log(err);
};

gulp.task('default', function() {
  nodemon({
    script: "server.js",
    ignore: ['./public/','./node_modules/','./.gitignore','./npm-debug.log','./package.json','./README.md']
  });
});