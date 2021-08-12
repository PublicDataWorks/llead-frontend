import config from 'config'

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

  gtag('event', 'card_expand', {
    category: eventCard.type,
    [eventCard.type]: eventCard.id,
  })
}

export const analyzeCopyCardLink = (eventCard) => {
  const gtag = getGtag()

  gtag('event', 'copy_card_link', {
    category: eventCard.type,
    [eventCard.type]: eventCard.id,
  })
}
