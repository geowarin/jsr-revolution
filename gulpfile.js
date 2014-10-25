var gulp = require('gulp'),
  gutil = require('gulp-util'),
  ts = require('gulp-typescript'),
  concat = require('gulp-concat-sourcemap'),
  sourcemaps = require('gulp-sourcemaps'),
  processhtml = require('gulp-processhtml'),
  connect = require('gulp-connect'),
  del = require('del'),
  clean = require('gulp-clean');

paths = {
  assets: 'src/assets/**/*',
  css: 'src/css/*.css',
  libs: [
    'src/vendor/phaser-official/build/phaser.min.js'
  ],
  ts: 'src/scripts/**/*.ts',
  build: './build/',
  dist: './dist/'
};

gulp.task('clean', function (cb) {
  del([paths.build], cb);
});

gulp.task('copy', ['clean'], function () {
  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.build + 'assets'))
    .on('error', gutil.log);
  gulp.src(paths.libs)
    .pipe(gulp.dest(paths.build + 'vendor'))
    .on('error', gutil.log);
});

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  sortOutput: true,
  //module: 'commonjs',
  sourceRoot: '../src/scripts'
});

gulp.task('typescript', ['clean'], function () {
  var tsResult = gulp.src(paths.ts, {base: 'src'})
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build + 'js'));

  //return eventStream.merge(
  //  tsResult.dts.pipe(gulp.dest(paths.build + 'defs')),
  //  tsResult.js.pipe(gulp.dest(paths.build + 'js'))
  //);
});

gulp.task('processhtml', ['clean'], function () {
  gulp.src('src/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths.build))
    .on('error', gutil.log);
});

gulp.task('watch', function () {
  gulp.watch(paths.ts, ['typescript']);
});

gulp.task('connect', function () {
  connect.server({
    //root: [__dirname + '/src', paths.build + 'js'],
    root: [paths.build],
    port: 9000,
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['copy', 'typescript', 'processhtml']);
