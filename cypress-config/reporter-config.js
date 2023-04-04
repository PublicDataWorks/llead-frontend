const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporterEnabled: 'spec, mocha-junit-reporter',
  mochaJunitReporterReporterOptions: {
    mochaFile: 'cypress/results/results-[hash].xml',
  },
})
