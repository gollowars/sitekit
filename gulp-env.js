let minimist = require('minimist')
let options = minimist(process.argv.slice(2), envOption)
let envOption = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
}
let isProd = (options.env === 'prod') ? true : false;
let watchFlag =  (isProd == false) ? true : false

module.exports = {
  prod: isProd
}