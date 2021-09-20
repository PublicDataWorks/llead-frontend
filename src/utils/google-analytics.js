import config from 'config'
import { EVENT_TYPES } from 'constants/common'

const { gaMeasurementId } = config

const getGtag = () => {
  /* istanbul ignore else  */
  if (gaMeasurementId) {
    return window.gtag
  } else {
    const localGtag = (type, eventName, params) => {
      console.log(`MEASUREMENT TYPE: ${type}`)
      console.log(`MEASUREMENT EVENT NAME: ${eventName}`)
      console.log(`MEASUREMENT PARAMS:`)
      console.log(params)
    }
    return localGtag
  }
}

export const analyzeExpandEventCard = (eventCard) => {
  const gtag = getGtag()

  gtag('event', EVENT_TYPES.CARD_EXPAND, {
    category: eventCard.type,
    [eventCard.type]: eventCard.id,
  })
}

export const analyzeCopyCardLink = (eventCard) => {
  const gtag = getGtag()

  gtag('event', EVENT_TYPES.COPY_CARD_LINK, {
    category: eventCard.type,
    [eventCard.type]: eventCard.id,
  })
}

export const analyzeAction = (event) => {
  const gtag = getGtag()

  gtag('event', event.type, event.data)
}
