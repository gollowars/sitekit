import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import webpackStream from 'webpack-stream'
const WEBPACK_CONFIG = require('../webpack.config')
import path from 'path'

let env = require(path.join(__dirname,'../gulp-env.js'))

gulp.task('webpack',function(){
  return webpackStream(WEBPACK_CONFIG, $.webpack)
    .pipe($.if(env.prod, $.uglify({preserveComments: 'some'})))
    .pipe(gulp.dest(path.join(__dirname,'../public/assets/js/')))
})

gulp.task('concat-js-lib', () => {
  return gulp.src([
      path.join(__dirname,'../src/js/lib/jquery.js'),
      path.join(__dirname,'../src/js/lib/jquery.easing.min.js'),
      path.join(__dirname,'../src/js/lib/logger.min.js'),
      path.join(__dirname,'../src/js/lib/snap.svg-min.js'),
      path.join(__dirname,'../src/js/lib/jquery.pjax.js'),
      path.join(__dirname,'../src/js/lib/jquery.transit.min.js')
    ])
    .pipe($.concat('lib.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(path.join(__dirname, '../public/assets/js/')))
})