const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

let baseConfig = require('./base.config')

const srcPath = path.join(__dirname, '../src')

let config = Object.assign({}, baseConfig, {
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      filename: 'index.html',
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV, 'staging'),
      'process.env.GA_MEASUREMENT_ID': JSON.stringify(
        process.env.GA_STAGING_MEASUREMENT_ID
      ),
    }),
  ],
})

module.exports = config
