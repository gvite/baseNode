/**
 * Created by @gflores
 */
//Gulp, more information at http://gulpjs.com/
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

var sass = require('gulp-sass');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 5000
        },
        ignore: ['./node_modules/**','./sass/**']
    })
        .on('restart', function () {
            console.log('restarting...');
        })
});
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});