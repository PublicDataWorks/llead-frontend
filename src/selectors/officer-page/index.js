import { createSelector } from 'reselect'
import moment from 'moment'
import numeral from 'numeral'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import mapValues from 'lodash/mapValues'
import pick from 'lodash/pick'
import compact from 'lodash/compact'
import trim from 'lodash/trim'
import every from 'lodash/every'

import { formatDataPeriods } from 'utils/formatter'
import { officerFormatter } from 'selectors/common'

const formatCurrencyNumber = (value) => {
  return numeral(value).format('$0,0.[00]')
}

export const formatSalary = (data, longForm = false) => {
  const annualSalary = get(data, 'annualSalary')
  const hourlySalary = get(data, 'hourlySalary')

  let salary
  if (!isEmpty(annualSalary)) {
    salary = `${formatCurrencyNumber(annualSalary)}/${longForm ? 'year' : 'yr'}`
  } else if (!isEmpty(hourlySalary)) {
    salary = `${formatCurrencyNumber(hourlySalary)}/${longForm ? 'hour' : 'hr'}`
  }
  return salary
}

const formatOfficerDescription = (officer) => {
  const birthYear = trim(get(officer, 'birthYear'))
  const race = trim(get(officer, 'race'))
  const gender = trim(get(officer, 'gender'))
  const age = birthYear && moment().diff(moment(birthYear, 'YYYY'), 'years')

  if (age && race && gender) {
    const ageString = `${age}-year-old`
    return join([ageString, race, gender], ' ')
  } else {
    const ageString = age && `${age} years old`
    return join(compact([ageString, race, gender]), ', ')
  }
}

const officerDetailsFormatter = (officer) => {
  if (isEmpty(officer)) {
    return {}
  }

  const officerDepartmentAttributes = ['id', 'name']
  const officerAttributes = [
    'id',
    'name',
    'badges',
    'documentsCount',
    'complaintsCount',
  ]

  const salary = formatSalary(officer, true)

  const allDataPeriods = mapValues(
    pick(officer, [
      'documentsDataPeriod',
      'complaintsDataPeriod',
      'dataPeriod',
    ]),
    (value) => formatDataPeriods(value)
  )

  const officerDepartment = get(officer, 'department')

  return {
    ...pick(officer, officerAttributes),
    description: formatOfficerDescription(officer),
    salary,
    ...allDataPeriods,
    department: pick(officerDepartment, officerDepartmentAttributes),
  }
}

const getOfficer = (state) => get(state.officerPage, 'officer', {})

export const getIsOfficerRequesting = (state) =>
  get(state, 'officerPage.isOfficerRequesting')

export const officerSelector = createSelector(
  getOfficer,
  officerDetailsFormatter
)

export const officerRecentDataSelector = createSelector(
  getOfficer,
  officerFormatter
)
