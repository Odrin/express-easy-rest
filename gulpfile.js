var tslint = require('gulp-tslint');
var exec = require('child_process').exec;
var jasmine = require('gulp-jasmine');
var gulp = require('gulp-help')(require('gulp'));
var path = require('path');
var inject = require('gulp-inject');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var express = require('express');
require('dotbin');

gulp.task('clean', 'Cleans the generated js files from lib directory', function () {
  return del([
    'lib/**/*'
  ]);
});

gulp.task('tslint', 'Lints all TypeScript source files', function () {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('_build', 'INTERNAL TASK - Compiles all TypeScript source files', function (cb) {
  exec('tsc --version', function (err, stdout, stderr) {
    console.log('TypeScript ', stdout);
    if (stderr) {
      console.log(stderr);
    }
  });

  return exec('tsc', function (err, stdout, stderr) {
    console.log(stdout);
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
});

gulp.task('build', 'Compiles all TypeScript source files and updates module references', function (callback) {
  // gulpSequence('tslint', 'clean', '_build')(callback);
  gulpSequence('clean', '_build')(callback); //TODO: tslint
});

gulp.task('test', 'Runs the Jasmine test specs', ['build'], function () {
  return gulp.src('lib/test/**/*.spec.js')
    .pipe(jasmine());
});

gulp.task('watch', 'Watches ts source files and runs build on change', function () {
  gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('server-local', [], function () {
  var app = require('./lib/example/index');
  var session = require('express-session');

  express()
    .use(session({
      secret: 'example',
      saveUninitialized: true,
      resave: false,
      cookie: {}
    }))
    .use('/api', app.middleware())
    .listen(8000);

  console.info('Local rest api server running on http://localhost:8000/');
});

gulp.task('default', 'Default task', ['test']);
