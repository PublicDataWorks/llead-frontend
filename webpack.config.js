'use strict'

const path = require('path')

const allowedEnvs = ['dev', 'test', 'integration-test']

let env = process.env['WEBPACK_ENV']
let isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1
if (!isValid) {
  throw `Invalid env: ${env}`
}

module.exports = require(path.join(__dirname, `webpack-config/${env}.config`))
