import path from 'path'
let minimist = require('minimist')
let envOption = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'local' }
}

let options = minimist(process.argv.slice(2), envOption)
let isProd = (options.env === 'prod') ? true : false;

let ENV_VARIABLE = require('./env-config')

module.exports = {
  VERSION: "0.0.1",
  prod: isProd,
  env: options.env,
  config: ENV_VARIABLE[options.env]
}