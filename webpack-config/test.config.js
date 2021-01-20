let baseConfig = require('./base.config')

let config = Object.assign({}, baseConfig, {
  devServer: {
    historyApiFallback: true,
    port: 9090,
  },
})

module.exports = config
