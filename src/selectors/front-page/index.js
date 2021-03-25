import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

import {
  departmentFormatter,
  officerFormatter,
  documentFormatter,
} from 'selectors/common'

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

export const documentsSelector = (state) => {
  return map(getDocuments(state), documentFormatter)
}
