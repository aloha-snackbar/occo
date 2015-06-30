/* globals require, console */
'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');

gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer-core');
  var cssnano = require('cssnano');
  var simpleVars = require('postcss-simple-vars');
  var colorHexAlpha = require('postcss-color-hex-alpha');
  var selectorNot = require('postcss-selector-not');

  var processors = [
    autoprefixer('> 3%'),
    cssnano({
      autoprefixer: false,
      calc: { precision: 2 },
      urls: { normalizeProtocol: false }
    }),
    simpleVars,
    colorHexAlpha,
    selectorNot
  ];

  return gulp.src('assets/**/*.css')
    .pipe(changed('public'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('public'));
});

gulp.task('js', function () {
  var babel = require('gulp-babel');
  var uglify = require('gulp-uglify');

  return gulp.src('assets/**/*.js')
    .pipe(changed('public'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});
gulp.task('html', function () {
  var htmlmin = require('gulp-htmlmin');

  return gulp.src('assets/**/*.html')
    .pipe(changed('public'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('others', function () {
  return gulp.src([
    'assets/**/*',
    '!assets/**/*.{css,js,html}'
  ])
    .pipe(changed('public'))
    .pipe(gulp.dest('public'));
});

gulp.task('server', function () {
  var childProcess = require('child_process');

  var server = childProcess.fork('server/index.js');

  return gulp.watch('server/**/*', function (e) {
    if (e.type === 'changed') {
      server.kill('SIGINT');
      console.log('Restarting server...');
      server = childProcess.fork('server/index.js');
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('assets/**/*.css',  ['css' ]);
  gulp.watch('assets/**/*.js',   ['js'  ]);
  gulp.watch('assets/**/*.html', ['html']);
});

gulp.task('build', ['css', 'js', 'html', 'others']);
gulp.task('serve', ['build', 'watch', 'server']);