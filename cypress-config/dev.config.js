const { defineConfig } = require('cypress')
const _ = require('lodash')

let baseConfig = require('./base.config')

let config = _.mergeWith(
  baseConfig,
  defineConfig({
    video: false,
    screenshotOnRunFailure: false,
  }),
  (a, b) => (_.isArray(b) ? b : undefined)
)

module.exports = config
