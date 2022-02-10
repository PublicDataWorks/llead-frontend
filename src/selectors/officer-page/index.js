import { createSelector } from 'reselect'
import moment from 'moment'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import pick from 'lodash/pick'
import compact from 'lodash/compact'
import trim from 'lodash/trim'
import map from 'lodash/map'

import { formatSalary } from 'utils/formatter'

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

  const salary = get(officer, 'salary')
  const salaryFreq = get(officer, 'salaryFreq')

  const salaryString = formatSalary(salary, salaryFreq)

  const officerDepartment = get(officer, 'departments', [])

  const departments = map(officerDepartment, (department) =>
    pick(department, officerDepartmentAttributes)
  )

  return {
    ...pick(officer, officerAttributes),
    description: formatOfficerDescription(officer),
    salary: salaryString,
    departments,
  }
}

const getOfficer = (state) => get(state.officerPage, 'officer', {})

export const getIsOfficerRequesting = (state) =>
  get(state, 'officerPage.isOfficerRequesting')

export const officerSelector = createSelector(
  getOfficer,
  officerDetailsFormatter
)

const recentOfficerFormatter = (officer) => {
  const officerAttributes = ['id', 'name', 'badges']

  const rawDepartment = get(officer, 'departments.0')
  const department = pick(rawDepartment, ['id', 'name'])

  return {
    ...pick(officer, officerAttributes),
    department,
  }
}

export const officerRecentDataSelector = createSelector(
  getOfficer,
  recentOfficerFormatter
)
