import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

import { formatDocumentDate } from 'utils/formatter'
import { departmentFormatter, officerFormatter } from 'selectors/common'

const documentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'documentType',
    'url',
    'previewImageUrl',
    'pagesCount',
    'departments',
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

const getAnalyticSummary = (state) =>
  get(state.frontPage, 'analyticSummary', {})

const getDepartments = (state) => get(state.frontPage, 'departments', [])
const getOfficers = (state) => get(state.frontPage, 'officers', [])
const getDocuments = (state) => get(state.frontPage, 'documents', [])

export const analyticSummarySelector = (state) => {
  const rawAnalyticSummary = getAnalyticSummary(state)

  const attributes = [
    'departmentsCount',
    'officersCount',
    'documentsCount',
    'recentDocumentsCount',
    'recentDepartmentsCount',
    'recentOfficersCount',
    'recentDays',
  ]

  return pick(rawAnalyticSummary, attributes)
}

export const departmentsSelector = (state) =>
  map(getDepartments(state), departmentFormatter)

export const officersSelector = (state) =>
  map(getOfficers(state), officerFormatter)

export const documentsSelector = (state) =>
  map(getDocuments(state), documentFormatter)
