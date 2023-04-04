const webpack = require('webpack')

let baseConfig = require('./base.config')
const Dotenv = require('dotenv-webpack')

let config = Object.assign({}, baseConfig, {
  devServer: {
    historyApiFallback: true,
    port: 9090,
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
})

module.exports = config
