import defaultConfig from './base.config'

let env = process.env['APP_ENV']

export default {
  ...defaultConfig,
  appEnv: env,
  ...require(`./${env}.config`).default,
}
