import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import path from 'path'
import fs from 'fs-extra'
import Fontmin from 'fontmin'
import fontmin from 'gulp-fontmin'
import otf2ttf from 'otf2ttf'
import through from 'through2'

let otfpath = path.join(__dirname,'../src/fonts-otf/**/*.otf')
let ttfpath = path.join(__dirname,'../src/fonts-ttf/')

let fontpath = path.join(__dirname,'../src/fonts-ttf/**/*.ttf')
let distpath = path.join(__dirname, '../src/fonts-dist/')


gulp.task('otf2ttf',function(){
  let fontmin = new Fontmin()
  .src(otfpath)
  .use(Fontmin.otf2ttf())
  .dest(ttfpath)

  fontmin.run(function (err, files) {
      if (err) {
          throw err;
      }
      console.log(files[0]);
  })
})

gulp.task('subset',function(){
  let buffers = []

  return gulp.src(path.join(__dirname,'../src/data/**/*.yml'))
    .pipe(through.obj(function(file, enc, cb){
      this.push(file.contents)
      cb()
    }))
    .on('data',function(data){
      buffers.push(data)
    })
    .on('end',function(){
      let text = Buffer.concat(buffers).toString('utf-8')
      console.log(text)
      gulp.src(fontpath)
        .pipe(fontmin({text: text}))
        .pipe(gulp.dest(distpath))
    })
    
})

