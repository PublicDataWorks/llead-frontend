const { defineConfig } = require('cypress')
const path = require('path')

module.exports = defineConfig({
  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require(path.join(__dirname, '../cypress/plugins/index.js'))(
        on,
        config
      )
    },
    baseUrl: 'http://localhost:9090',
    specPattern: [
      'integration-tests/interactive-tests/**/*.cy.{js,jsx,ts,tsx}',
      'integration-tests/tests/**/*.cy.{js,jsx,ts,tsx}',
    ],
    supportFile: path.join(__dirname, '../cypress/support/index.js'),
  },
})
