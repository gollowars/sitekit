import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})

const bs = require("browser-sync").create()
const bsConf = require('../bs-config')
gulp.task('server',function(){
  bs.init(bsConf)
  return
})

gulp.task('reload',function(){
  bs.reload()
  return
})
