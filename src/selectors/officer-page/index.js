import moment from 'moment'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import pick from 'lodash/pick'
import trim from 'lodash/trim'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'

import { formatDocumentDate, formatDataPeriods } from 'utils/formatter'

const documentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'documentType',
    'url',
    'textContent',
  ]
  const rawDepartments = get(document, 'departments')
  const departments = map(rawDepartments, (department) =>
    pick(department, ['id', 'name'])
  )

  return {
    ...pick(document, documentAttributes),
    incidentDate: formatDocumentDate(document.incidentDate),
    departments,
  }
}

const getOfficer = (state) => get(state.officerPage, 'officer', {})
const getDocuments = (state) => get(state.officerPage, 'documents', {})

export const getIsOfficerRequesting = (state) =>
  get(state, 'officerPage.isOfficerRequesting')

export const officerSelector = (state) => {
  const officerDepartmentAttributes = ['id', 'name']
  const officerAttributes = [
    'id',
    'name',
    'badges',
    'documentsCount',
    'complaintsCount',
  ]

  const rawOfficer = getOfficer(state)

  if (isEmpty(rawOfficer)) {
    return {}
  }

  const birthYear = get(rawOfficer, 'birthYear')

  const age = birthYear
    ? `${moment().diff(moment(birthYear, 'YYYY'), 'years')}-year-old`
    : ''
  const description = trim(
    join([age, get(rawOfficer, 'gender', ''), get(rawOfficer, 'race', '')], ' ')
  )

  const rawAnnualSalary = get(rawOfficer, 'annualSalary')
  const annualSalary = rawAnnualSalary ? `$${rawAnnualSalary}/year` : ''

  const {
    documentsDataPeriod,
    complaintsDataPeriod,
    dataPeriod,
  } = mapValues(
    pick(rawOfficer, [
      'documentsDataPeriod',
      'complaintsDataPeriod',
      'dataPeriod',
    ]),
    (value) => formatDataPeriods(value)
  )

  const rawOfficerDepartment = get(rawOfficer, 'department')

  return {
    ...pick(rawOfficer, officerAttributes),
    description,
    annualSalary,
    dataPeriod,
    documentsDataPeriod,
    complaintsDataPeriod,
    department: pick(rawOfficerDepartment, officerDepartmentAttributes),
  }
}

export const documentsSelector = (state) => {
  const rawDocuments = getDocuments(state)

  return map(rawDocuments, documentFormatter)
}
