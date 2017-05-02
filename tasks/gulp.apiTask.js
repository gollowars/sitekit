import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import path from 'path'

gulp.task('apitask',function(cb){
  let started = false
  return $.nodemon({
    script: path.join(__dirname,'../server/src/app.js')
  }).on('start', () => {
    if (started == false) {
      cb()
      started = true
    }
  })
})