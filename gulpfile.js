/*
Dependencias
*/

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  connect = require('gulp-connect-php'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  wiredep = require('wiredep').stream,
  minifyCSS = require('gulp-minify-css'),
  minifyHTML = require('gulp-minify-html');

/*
Configuracion de la tarea 'Demo'
*/
gulp.task('js', function(){
    gulp.src('js/source/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/build/'))
});
gulp.task('css', function(){
    gulp.src('css/source/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('css/min'))
});
gulp.task('sass', function(){
    gulp.src('css/source/*.scss')
        .pipe(sass())
        //.pipe(minifyCSS())
        .pipe(gulp.dest('css/min/'))
});
gulp.task('html', function(){
    var opts = {comments:true, spare:true};
    gulp.src('index1.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/'))
});
gulp.task('wiredep', function () {
   gulp.src('./index.php')
     .pipe(wiredep({
       directory: './assets/'
     }))
     .pipe(gulp.dest('./'));
 });

gulp.task('connect-sync', function() {
  connect.server({
      base: 'app',
      port: 4000
  }, function (){
    browserSync({
      injectChanges: true,
      proxy: '127.0.0.1:8000'
    });
  });

  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });
});

gulp.task('watch', function(){
    gulp.watch('css/source/*.scss', ['sass']);
    gulp.watch('js/source/*.js', ['js']);
    gulp.watch(['./bower.json'], ['wiredep']);
    
});

gulp.task('default', ['connect-sync','watch']);