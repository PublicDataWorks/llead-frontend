/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const path = require('path')
const { rmdir } = require('fs')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // const options = {
  //   // send in the options from your webpack.config.js, so it works the same
  //   // as your app's code
  //   webpackOptions: require('../../webpack-config/test.config'),
  //   watchOptions: {},
  // }

  const options = webpackPreprocessor.defaultOptions

  Object.assign(options.webpackOptions, {
    resolve: {
      modules: [path.resolve(__dirname, '../../src'), 'node_modules'],
    },
  })

  delete options.webpackOptions.module.rules[0].use[0].options.presets

  on('file:preprocessor', webpackPreprocessor(options))

  on('after:run', () => {
    const downloadsFolder = config.downloadsFolder
    return new Promise((resolve, reject) => {
      rmdir(downloadsFolder, { maxRetries: 10, recursive: true }, (err) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        resolve(null)
      })
    })
  })
}
