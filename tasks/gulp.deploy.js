import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins({pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
import path from 'path'
import s3 from 's3'

let config = require(path.join(__dirname,"../deploy.json"))
const distRoot = path.join(__dirname,"../public/")

// gulp.task('deploy_dev', () => {
//   return gulp.src(distRoot)
//     .pipe($.rsync({
//       root: distRoot,
//       hostname: config.rsync.dst.host,
//       destination: config.rsync.dst.path ,
//       progress: true,
//       recursive: true,
//       compress: true,
//       clean: true,
//       exclude: [
//         '.git',
//         '.gitignore',
//         '.DS_Store',
//         'node_modules'
//       ]
//     }))
// })


gulp.task('s3-sync',() => {
  let client = s3.createClient({
    maxAsyncS3: 20,     // this is the default 
    s3RetryCount: 3,    // this is the default 
    s3RetryDelay: 1000, // this is the default 
    multipartUploadThreshold: 20971520, // this is the default (20 MB) 
    multipartUploadSize: 15728640, // this is the default (15 MB) 
    s3Options: {
      accessKeyId: config.s3.dst.id,
      secretAccessKey: config.s3.dst.secret,
      endpoint: "s3-ap-northeast-1.amazonaws.com"
      // any other options are passed to new AWS.S3() 
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
    },
  })
  // upload
  let params = {
    localDir: path.join(__dirname,"../public"),
    s3Params: {
      Bucket: config.s3.dst.bucket,
      Prefix: ""
    }
  }

  let uploader = client.uploadDir(params)
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack)
  })
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal)
  })
  uploader.on('end', function() {
    console.log("done uploading")
  })


})