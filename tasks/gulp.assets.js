import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import merge from 'merge-stream'

import path from 'path'


gulp.task('assets', () => {
  return merge(
    gulp.src([path.join(__dirname,'../src/images/**/*'), path.join(__dirname,'!../src/images/tmp'), path.join(__dirname,'!../src/images/tmp/**')])
      .pipe(gulp.dest(path.join(__dirname,'../public/assets/images/')))
      .pipe($.preservetime()),
    gulp.src([path.join(__dirname,'../src/fonts-dist/**/*'), "!"+path.join(__dirname,'../src/fonts-dist/**/*.css')])
      .pipe(gulp.dest(path.join(__dirname,'../public/assets/fonts/')))
      .pipe($.preservetime()),
    gulp.src([path.join(__dirname,'../src/js/modernizr.js'),path.join(__dirname,'../src/js/platform.js')])
      .pipe(gulp.dest(path.join(__dirname,'../public/assets/js/')))
    // gulp.src(['../src/json/**'])
    //   .pipe(gulp.dest(env.dest + 'data/'))
  )
})