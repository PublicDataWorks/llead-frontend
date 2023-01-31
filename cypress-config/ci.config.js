const { defineConfig } = require('cypress')
const _ = require('lodash')

let baseConfig = require('./base.config')

const itestType = process.env['ITEST_TYPE']

const specPattern =
  itestType === 'interactive'
    ? ['integration-tests/interactive-tests/**/*.cy.{js,jsx,ts,tsx}']
    : ['integration-tests/tests/**/*.cy.{js,jsx,ts,tsx}']

let config = _.mergeWith(
  baseConfig,
  defineConfig({
    e2e: {
      specPattern,
    },
  }),
  (a, b) => (_.isArray(b) ? b : undefined)
)

console.log(config)

module.exports = config
