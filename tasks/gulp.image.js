import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import path from 'path'
import convertBase64 from 'gulp-base64-stylus'

gulp.task('image',function(){
  gulp.src(path.join(__dirname,'../src/style/images/pc/'))
    .pipe(convertBase64({output:'_image.styl',sass: false}))
    .pipe(gulp.dest(path.join(__dirname,'../src/style/pc/')))

  gulp.src(path.join(__dirname,'../src/style/images/sp/'))
    .pipe(convertBase64({output:'_image.styl',sass: false}))
    .pipe(gulp.dest(path.join(__dirname,'../src/style/sp/')))
})