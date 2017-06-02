/**
 * Created by @gflores
 */
//Gulp, more information at http://gulpjs.com/
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 5000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', function () {
            console.log('restarting...');
        })
})