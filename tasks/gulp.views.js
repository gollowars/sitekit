import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import vinylYamlData from 'vinyl-yaml-data'
import deepExtend from 'deep-extend-stream'
import path from 'path'
let env = require(path.join(__dirname,'../gulp-env.js'))

let locals
let prefix = "page-"

function getDirClass(pathstr){
  let pathClassArray = []
  let pathlist = pathstr.split('/')
  for (var i = 0; i < pathlist.length; i++) {
    if(pathlist[i].indexOf('.pug') == -1){
      pathClassArray.push(pathlist[i])
    }
  }
  if(pathClassArray.length == 0 || (pathClassArray[0] == 'sp' && pathClassArray.length == 1)){
    pathClassArray.push('top')
  }

  pathClassArray = pathClassArray.map(function(name,index){
    return prefix+ name
  })
  return pathClassArray
}

function getRelativePath(pathstr){
  let slashCnt = pathstr.split('/').length-1
  let relativePath = ""
  for(let i = 0;i<slashCnt;i++){
    relativePath = "../"+relativePath
  }
  return relativePath
}

gulp.task('data', () => {
  locals = {}
  return gulp.src(path.join(__dirname,'../src/data/**/*.y{,a}ml'))
    .pipe($.plumber( {errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe(vinylYamlData())
    .pipe(deepExtend(locals))
})

gulp.task('views',['data'],function(){
  return gulp.src([path.join(__dirname,'../src/views/**/*.pug'),"!"+path.join(__dirname,'../src/views/_layout/*.pug'),"!"+path.join(__dirname,'../src/views/**/_*.pug'),"!"+path.join(__dirname,'../src/views/sp/*.pug')])
    .pipe($.data( (file) => {
      let p = path.dirname(file.path).split('/src/').pop().split('/')
      let depthStr = file.path.split(path.join(__dirname,'../src/views/'))[1]

      let relativePath = getRelativePath(depthStr)
      let classes = getDirClass(depthStr)

      return {"path": relativePath, "data":locals, "pageClass": classes.join(' '),"version": env.VERSION}
    }))
    .pipe($.plumber( {errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe($.pug([]))
    .pipe(gulp.dest(path.join(__dirname,'../public/')))
})