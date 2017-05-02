import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import vinylYamlData from 'vinyl-yaml-data'
import deepExtend from 'deep-extend-stream'
import path from 'path'

let locals

gulp.task('data', () => {
  locals = {}
  return gulp.src(path.join(__dirname,'../src/data/**/*.y{,a}ml'))
    .pipe(vinylYamlData())
    .pipe(deepExtend(locals))
})

gulp.task('views',['data'],function(){
  return gulp.src([path.join(__dirname,'../src/views/**/*.pug'),"!"+path.join(__dirname,'../src/views/_layout/*.pug'),"!"+path.join(__dirname,'../src/views/**/_*.pug')])
    .pipe($.data( (file) => {
      let p = path.dirname(file.path).split('/src/').pop().split('/')
      let depthStr = file.path.split(path.join(__dirname,'../src/views/'))[1]
      let slashCnt = depthStr.split('/').length-1
      let relativePath = ""
      for(let i = 0;i<slashCnt;i++){
        relativePath = "../"+relativePath
      }

      return {"path": relativePath, "data":locals}
    }))
    .pipe($.pug([]))
    .pipe(gulp.dest(path.join(__dirname,'../public/')))
})