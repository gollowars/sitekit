let path = require('path')
let env = require(path.join(__dirname,'./gulp-env.js'))
const webpack = require("webpack")

module.exports = {
  watch: false,
  entry: {
    bundle: ["./src/js/main.js"]
  },
  cache: true,
  stats: { colors: true },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader:  'babel-loader',
          options: {
            presets: [
              'env',
              'stage-3',
              'es2017'
            ],
            plugins: [
              'transform-async-to-generator',
              ["transform-class-properties", { "spec": true }],
              'babel-plugin-espower',
              ['transform-runtime', {
                regenerator: true,
                polyfill: true,
                helper: true,
              }],
            ]
          }
        }
      },
      {
        test: /\.(glsl|vs|fs)$/,
        use: 'webpack-glsl-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /(animation\.gsap|SplitText)\.js$/,
        use: "imports-loader?define=>false"
      },
      {
        test: /\.(vert|frag|glsl)$/,
        use:[
          'raw-loader',
          'glslify-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'bundle'
    }),
    new webpack.DefinePlugin({
      WEBPACK_DEFINITION: JSON.stringify(env.config),
      BUILD_VERSION: JSON.stringify(env.VERSION)
    })
  ],
  devtool: 'source-map',
}