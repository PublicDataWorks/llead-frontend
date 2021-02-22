import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

import { formatDocumentDate } from 'utils/formatter'

const documentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'url',
    'previewImageUrl',
    'pagesCount',
  ]

  return {
    ...pick(document, documentAttributes),
    incidentDate: formatDocumentDate(document.incidentDate),
    type: document.documentType,
  }
}

const getDepartment = (state) => get(state.departmentPage, 'department', {})
const getDocuments = (state) => get(state.departmentPage, 'documents', {})
const getDocumentsPagination = (state) =>
  get(state.departmentPage, 'documentsPagination', {})

export const departmentSelector = (state) => {
  const wrglAttributes = [
    'id',
    'name',
    'slug',
    'description',
    'url',
    'downloadUrl',
    'defaultExpanded',
  ]
  const departmentAttributes = [
    'id',
    'city',
    'complaintsCount',
    'documentsCount',
    'locationMapUrl',
    'name',
    'parish',
    'officersCount',
  ]

  const rawDepartment = getDepartment(state)
  const rawWrglFiles = get(rawDepartment, 'wrglFiles')

  return {
    ...pick(rawDepartment, departmentAttributes),
    wrglFiles: map(rawWrglFiles, (wrglFile) => pick(wrglFile, wrglAttributes)),
  }
}

export const documentsSelector = (state) => {
  const rawDocuments = getDocuments(state)

  return map(rawDocuments, documentFormatter)
}

export const documentsPaginationSelector = (state) => {
  const paginationAttributes = ['limit', 'offset', 'count']

  return pick(getDocumentsPagination(state), paginationAttributes)
}
