const path = require('path')

const itestEnv = process.env.ITEST_ENV || 'dev'

module.exports = require(path.join(
  __dirname,
  `cypress-config/${itestEnv}.config`
))
