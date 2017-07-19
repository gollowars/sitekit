let path = require('path')
let env = require(path.join(__dirname,'./gulp-env.js'))
let watchFlag = (env.env == 'local') ? true : false
const webpack = require("webpack")


module.exports = {
  watch: watchFlag,
  entry: {
    bundle: ["babel-polyfill", "./src/js/main.js"]
    // sp__bundle: "./src/js/sp__main.js",
    // detectpc: "./src/js/detectpc.js",
    // detectsp: "./src/js/detectsp.js"
  },
  stats: { colors: true },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      {test: /\.js$/, exclude: /node_modules|modules/, loaders: ['babel-loader', 'eslint-loader']},
      {test: /\.(glsl|vs|fs)$/, loader: 'webpack-glsl-loader'},
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINITION: JSON.stringify(env.config),
      BUILD_VERSION: JSON.stringify(env.VERSION)
    })
  ],
  devtool: 'inline-source-map'
}