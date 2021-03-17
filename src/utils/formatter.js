import moment from 'moment'
import numeral from 'numeral'
import pluralize from 'pluralize'
import isEmpty from 'lodash/isEmpty'

import { DATE_FORMAT } from 'constants/common'

export const formatDocumentDate = (date) => {
  if (isEmpty(date)) {
    return ''
  }

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

export const formatNumber = (value) => {
  return numeral(value).format('0,0')
}

export const stringifyTotalItems = (count, itemName) => {
  return `${formatNumber(count)} ${pluralize(itemName, count)}`
}
