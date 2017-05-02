import gulp from 'gulp'
import path from 'path'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import runSequcence from 'run-sequence'
import del from 'del'

require('./tasks/gulp.assets')
require('./tasks/gulp.browserSync')
require('./tasks/gulp.script')
require('./tasks/gulp.style')
require('./tasks/gulp.views')
require('./tasks/gulp.font-subset')
require('./tasks/gulp.image')
require('./tasks/gulp.deploy')

////////////////
// api server
require('./tasks/gulp.apiTask')


gulp.task('watch', function(){
  gulp.watch(['./src/views/**/*.pug','./src/data/**/*.y{,a}ml'], ['views'])
  gulp.watch('./src/style/**/*.styl', ['style'])
  gulp.watch('./public/**/*', ['reload'])
})

gulp.task('default', function(){
  runSequcence(
    ['views','style','assets','concat-js-lib','image'],
    ['webpack','server','watch']
  )
})

gulp.task('clean', function(cb) {
  return del(['./public/'], cb)
})

gulp.task('build',['clean'],function(){
  return runSequcence(
    ['views','style','assets','concat-js-lib','image','webpack']
  )
})

