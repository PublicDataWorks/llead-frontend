const webpack = require('webpack')

let baseConfig = require('./base.config')

let config = Object.assign({}, baseConfig, {
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV, 'staging'),
      'process.env.GA_MEASUREMENT_ID': JSON.stringify(
        process.env.GA_STAGING_MEASUREMENT_ID
      ),
    }),
  ],
})

module.exports = config
