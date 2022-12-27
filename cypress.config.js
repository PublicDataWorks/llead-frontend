const { defineConfig } = require('cypress')

module.exports = defineConfig({
  retries: {
    runMode: 1,
  },
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:9090',
    specPattern: 'integration-tests/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'integration-tests/support/index.js',
  },
})
