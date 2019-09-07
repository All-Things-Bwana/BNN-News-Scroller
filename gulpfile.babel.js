import browserify from "browserify"
import gulp       from "gulp"
import plumber    from "gulp-plumber"
import source     from "vinyl-source-stream"
import buffer     from "vinyl-buffer"

gulp.task('build', function () {
  var b = browserify({
    entries: './src/index.js',
    debug: true,
  });

  gulp.src(["src/**/*", "!src/**/*.js"])
    .pipe(plumber())
    .pipe(gulp.dest('./dist/'));
    

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(gulp.dest('./dist/'));
});