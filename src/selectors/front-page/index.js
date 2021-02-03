import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

import { formatDocumentDate } from 'utils/formatter'

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

export const departmentsSelector = (state) => {
  const attributes = ['id', 'name', 'city', 'parish', 'locationMapUrl']

  return map(getDepartments(state), (department) =>
    pick(department, attributes)
  )
}

export const officersSelector = (state) => {
  const rawOfficers = getOfficers(state)

  const officerAttributes = ['name', 'badges']

  return map(rawOfficers, (officer) => {
    const rawDepartment = get(officer, 'department')
    const department = pick(rawDepartment, 'name')

    return {
      ...pick(officer, officerAttributes),
      department,
    }
  })
}

export const documentsSelector = (state) => {
  const rawDocuments = getDocuments(state)
  const documentAttributes = [
    'title',
    'url',
    'previewImageUrl',
    'incidentDate',
    'pagesCount',
    'departments',
  ]

  return map(rawDocuments, (document) => {
    const rawDepartments = get(document, 'departments')
    const departments = map(rawDepartments, (department) =>
      pick(department, ['id', 'name'])
    )

    const rawDocument = pick(document, documentAttributes)

    return {
      ...rawDocument,
      incidentDate: formatDocumentDate(rawDocument.incidentDate),
      type: document.documentType,
      departments,
    }
  })
}
