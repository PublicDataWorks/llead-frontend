const { defineConfig } = require('cypress')
const _ = require('lodash')
const path = require('path')

let baseConfig = require('./base.config')

const itestType = process.env['ITEST_TYPE']

const specPattern =
  itestType === 'interactive'
    ? ['integration-tests/interactive-tests/**/*.cy.{js,jsx,ts,tsx}']
    : ['integration-tests/tests/**/*.cy.{js,jsx,ts,tsx}']

let config = _.mergeWith(
  baseConfig,
  defineConfig({
    videoCompression: 12,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: path.join(__dirname, 'reporter-config.js'),
    },
    e2e: {
      specPattern,
    },
  }),
  (a, b) => (_.isArray(b) ? b : undefined)
)

module.exports = config
