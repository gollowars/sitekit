let path = require('path')
let env = require(path.join(__dirname,'./gulp-env.js'))
let watchFlag = (env.prod == false) ? true : false

module.exports = {
  watch: watchFlag,
  entry: {
    bundle: "./src/js/main.js",
    sp__bundle: "./src/js/sp__main.js",
    detectpc: "./src/js/detectpc.js",
    detectsp: "./src/js/detectsp.js"
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      {test: /\.js$/, exclude: /node_modules|modules/, loaders: ['babel-loader', 'eslint-loader']}
    ]
  },
  plugins: [],
  devtool: 'inline-source-map'
}