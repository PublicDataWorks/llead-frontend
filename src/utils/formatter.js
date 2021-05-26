import moment from 'moment'
import numeral from 'numeral'
import pluralize from 'pluralize'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import get from 'lodash/get'

import { DATE_FORMAT } from 'constants/common'

const formatCurrencyNumber = (value) => {
  return numeral(value).format('$0,0.[00]')
}

export const formatDate = (date) => {
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

export const formatDataPeriods = (periods) =>
  reduce(
    periods,
    (acc, element, key) =>
      `${acc}${key !== periods.length - 1 ? ', ' : ' and '}${element}`
  )

export const formatTimelineDate = (date) => {
  if (/^\d{4}$/.test(date)) {
    return date
  } else {
    return formatDate(date) || 'No Date'
  }
}

export const formatSalary = (salary, freq) => {
  if (isEmpty(salary)) {
    return ''
  }

  let parsedFreq

  const mapFreqToString = {
    yearly: '/year',
    hourly: '/hour',
    'bi-weekly': ' biweekly',
  }

  parsedFreq = get(mapFreqToString, freq, !isEmpty(freq) ? ` ${freq}` : '')

  return `${formatCurrencyNumber(salary)}${parsedFreq}`
}
