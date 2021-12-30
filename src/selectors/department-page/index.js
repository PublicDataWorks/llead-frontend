import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'

import { formatDate } from 'utils/formatter'
import { departmentFormatter, documentFormatter } from 'selectors/common'

const departmentDocumentFormatter = (document) => {
  const documentAttributes = [
    'id',
    'title',
    'url',
    'documentType',
    'textContent',
    'textContentHighlight',
  ]

  return {
    ...pick(document, documentAttributes),
    incidentDate: formatDate(document.incidentDate),
    recentData: documentFormatter(document),
  }
}

const departmentDetailsFormatter = (department) => {
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
    'address',
    'phone',
    'complaintsCount',
    'documentsCount',
    'recentDocumentsCount',
    'datasetsCount',
    'recentDatasetsCount',
    'locationMapUrl',
    'name',
    'parish',
    'officersCount',
    'newsArticlesCount',
    'recentNewsArticlesCount',
    'incidentForceCount',
    'dataPeriod',
  ]

  if (isEmpty(department)) {
    return {}
  }
  const rawWrglFiles = get(department, 'wrglFiles')

  const sustainedComplaintsCount = get(department, 'sustainedComplaintsCount')
  const complaintsCount = get(department, 'complaintsCount')
  const sustainedComplaintPercentage = complaintsCount
    ? Math.round((100 * sustainedComplaintsCount) / complaintsCount)
    : 0

  return {
    ...pick(department, departmentAttributes),
    sustainedComplaintPercentage,
    wrglFiles: map(rawWrglFiles, (wrglFile) => pick(wrglFile, wrglAttributes)),
  }
}

const getDepartment = (state) => get(state.departmentPage, 'department', {})
const getDocuments = (state) => get(state.departmentPage, 'documents', {})
const getDocumentsPagination = (state) =>
  get(state.departmentPage, 'documentsPagination', {})

export const getIsDepartmentRequesting = (state) =>
  get(state.departmentPage, 'isRequesting')

export const departmentSelector = createSelector(
  getDepartment,
  departmentDetailsFormatter
)

export const departmentRecentDataSelector = createSelector(
  getDepartment,
  departmentFormatter
)

export const documentsSelector = (state) => {
  const rawDocuments = getDocuments(state)

  return map(rawDocuments, departmentDocumentFormatter)
}

export const documentsPaginationSelector = (state) => {
  const paginationAttributes = ['limit', 'offset', 'count']

  return pick(getDocumentsPagination(state), paginationAttributes)
}
