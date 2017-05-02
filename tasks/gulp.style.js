import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import path from 'path'
let env = require(path.join(__dirname,'../gulp-env.js'))

gulp.task('style',function(){
  return gulp.src([path.join(__dirname,'../src/style/**/*.styl'),"!"+path.join(__dirname,'../src/style/**/_*.styl')])
    .pipe($.stylus({
      "include css": (env.prod == true) ? false : true,
      "compress": (env.prod == true) ? true : false
    }))
    .pipe($.autoprefixer({
      browsers: ["Android >= 4", "ios_saf >= 8"]
    }))
    .pipe(gulp.dest(path.join(__dirname,'../public/assets/css/')))
})