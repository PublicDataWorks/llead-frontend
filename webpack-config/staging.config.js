const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

let baseConfig = require('./base.config')

let config = Object.assign({}, baseConfig, {
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV, 'staging'),
      'process.env.GA_MEASUREMENT_ID': JSON.stringify(
        process.env.GA_MEASUREMENT_ID
      ),
      'process.env.MAPBOX_KEY': JSON.stringify(process.env.MAPBOX_KEY),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        styles: {
          test: /\.(css|scss|less)$/,
          enforce: true,
        },
      },
    },
  },
})

module.exports = config
