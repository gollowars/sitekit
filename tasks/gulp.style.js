import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import path from 'path'
let env = require(path.join(__dirname,'../gulp-env.js'))
let sourcemapFlag = ( env.prod ) ? false : true


gulp.task('style',function(){

  return gulp.src([path.join(__dirname,'../src/style/**/*.styl'),"!"+path.join(__dirname,'../src/style/**/_*.styl')])
    .pipe($.plumber( {errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe($.if(sourcemapFlag, $.sourcemaps.init()))
    .pipe($.stylus({
      "include css": (env.prod == true) ? false : true,
      "compress": true
    }))
    .pipe($.if(sourcemapFlag, $.sourcemaps.write()))
    .pipe($.autoprefixer({
      browsers: ["Android >= 4", "ios_saf >= 8"]
    }))
    .pipe(gulp.dest(path.join(__dirname,'../public/assets/css/')))
})