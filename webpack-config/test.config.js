const webpack = require('webpack')

let baseConfig = require('./base.config')

let config = Object.assign({}, baseConfig, {
  devServer: {
    historyApiFallback: true,
    port: 9090,
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.EnvironmentPlugin({
      APP_ENV: 'test',
      GA_MEASUREMENT_ID: '',
    }),
  ],
})

module.exports = config
