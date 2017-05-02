import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import path from 'path'

let config = require(path.join(__dirname,"../deploy.json"))
const distRoot = path.join(__dirname,"../public/")

gulp.task('deploy_dev', () => {
  return gulp.src(distRoot)
    .pipe($.rsync({
      root: distRoot,
      hostname: config.rsync.dst.host,
      destination: config.rsync.dst.path ,
      progress: true,
      recursive: true,
      compress: true,
      clean: true,
      exclude: [
        '.git',
        '.gitignore',
        '.DS_Store',
        'node_modules'
      ]
    }))
})