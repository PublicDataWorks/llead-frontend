const Dotenv = require('dotenv-webpack')

let baseConfig = require('./base.config')

let config = Object.assign({}, baseConfig, {
  plugins: [...baseConfig.plugins, new Dotenv()],
})

module.exports = config
