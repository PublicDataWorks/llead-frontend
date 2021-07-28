import config from 'config'
import noop from 'lodash/noop'

let gtag = noop

const { gaMeasurementId } = config

if (gaMeasurementId) {
  gtag = window.gtag
} else {
  gtag = (type, eventName, params) => {
    console.log(`MEASUREMENT TYPE: ${type}`)
    console.log(`MEASUREMENT EVENT NAME: ${eventName}`)
    console.log(`MEASUREMENT PARAMS:`)
    console.log(params)
  }
}

