var gulp = require('gulp'),
  gutil = require('gulp-util'),
  ts = require('gulp-typescript'),
  concat = require('gulp-concat-sourcemap'),
  sourcemaps = require('gulp-sourcemaps'),
  processhtml = require('gulp-processhtml'),
  connect = require('gulp-connect'),
  del = require('del'),
  uglify = require('gulp-uglifyjs'),
  deploy = require('gulp-gh-pages');

var paths = {
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
  del([paths.build, paths.dist], cb);
});

gulp.task('copy', ['clean', 'typescript'], function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'));
});

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  sortOutput: true,
  sourceRoot: '../src/scripts'
});

gulp.task('typescript', ['clean'], function () {
  var tsResult = gulp.src(paths.ts, {base: 'src'})
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build));
});

gulp.task('processhtml', ['clean'], function () {
  return gulp.src('src/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('reload', function () {
  gulp.src('src/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(paths.ts, ['typescript']);
  gulp.watch(['./src/index.html', paths.css, paths.ts], ['reload']);
});

gulp.task('connect', function () {
  connect.server({
    root: [__dirname + '/src', paths.build],
    port: 9000,
    livereload: true
  });
});

gulp.task('compress', ['typescript'], function () {
  return gulp.src([paths.libs[0], paths.build + 'main.js'])
    .pipe(uglify('all.min.js', {outSourceMap: false}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('deploy', ['build'], function () {
  return gulp.src('./dist/**/*')
    .pipe(deploy());
});

gulp.task('default', ['typescript', 'connect', 'watch']);
gulp.task('build', ['typescript', 'copy', 'compress', 'processhtml']);
gulp.task('dist', ['build', 'deploy']);
