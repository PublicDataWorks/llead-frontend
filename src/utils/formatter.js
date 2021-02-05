import moment from 'moment'

import { DATE_FORMAT } from 'constants/common'

export const formatDocumentDate = (date) => {
  try {
    const parseDate = moment(date)
    if (!parseDate.isValid()) {
      throw new Error()
    }
    return parseDate.format(DATE_FORMAT.LONG_DATE_FORMAT)
  } catch (error) {
    return ''
  }
}
