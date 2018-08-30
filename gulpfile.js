// const gulp = require('gulp');
// const babel = require('babelify');
// const browserify = require('browserify');
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');
// const browserSync = require('browser-sync');
// const reload = browserSync.reload;
// const notify = require('gulp-notify');
// const sass = require('gulp-sass');
// const concat = require('gulp-concat');

// // gulp.task('styles', () => {
// //   return gulp.src('./dev/styles/**/*.scss')
// //     .pipe(sass().on('error', sass.logError))
// //     .pipe(autoprefixer())
// //     .pipe(concat('style.css'))
// //     .pipe(gulp.dest('./public/styles'))
// // });

// // gulp.task('js', () => {
// //   browserify('dev/scripts/app.js', { debug: true })
// //     .transform('babelify', {
// //       sourceMaps: true,
// //       presets: ['env', 'react']
// //     })
// //     .bundle()
// //     .on('error', notify.onError({
// //       message: "Error: <%= error.message %>",
// //       title: 'Error in JS 💀'
// //     }))
// //     .pipe(source('app.js'))
// //     .pipe(buffer())
// //     .pipe(gulp.dest('public/scripts'))
// // });

// // gulp.task('bs', () => {
// //   browserSync.init({
// //     server: {
// //       baseDir: './'
// //     }
// //   });
// // });

// // gulp.task('default', ['bs', 'styles', 'js', 'watch']);


// // gulp.task('watch', function () {
// //   gulp.watch('./dev/scripts/*.js', ['js']);
// //   gulp.watch('./dev/styles/*.scss', ['styles']);
// //   gulp.watch('*.html', reload);
// // });



const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('styles', () => {
  return gulp.src('./dev/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/styles'))
});

gulp.task('js', () => {
  browserify('dev/scripts/main.js', { debug: true })
    .transform('babelify', {
      sourceMaps: true,
      presets: ['env', 'react']
    })
    .bundle()
    .on('error', notify.onError({
      message: "Error: <%= error.message %>",
      title: 'Error in JS 💀'
    }))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/scripts'))
    .pipe(reload({ stream: true }));
});

gulp.task('bs', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('default', ['js', 'bs', 'styles'], () => {
  gulp.watch('dev/**/*.js', ['js']);
  gulp.watch('dev/**/*.scss', ['styles']);
  gulp.watch('./public/styles/style.css', reload);
});