import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'

import { departmentFormatter } from 'selectors/common'
import { formatDate } from 'utils/formatter'

const featuredOfficerFormatter = (featuredOfficer) => {
  const featuredOfficerAttributes = [
    'id',
    'name',
    'isStarred',
    'useOfForcesCount',
    'badges',
    'complaintsCount',
    'latestRank',
    'department',
  ]

  return pick(featuredOfficer, featuredOfficerAttributes)
}

const featuredDocumentFormatter = (featuredDocument) => {
  const featuredDocumentAttributes = [
    'id',
    'title',
    'isStarred',
    'url',
    'incidentDate',
    'previewImageUrl',
    'pagesCount',
    'departments',
  ]

  return pick(featuredDocument, featuredDocumentAttributes)
}

const featuredNewsArticleFormatter = (featuredNewsArticle) => {
  const featuredNewsArticleAttributes = ['id', 'title', 'isStarred', 'url']

  return {
    ...pick(featuredNewsArticle, featuredNewsArticleAttributes),
    publishedDate: formatDate(featuredNewsArticle.publishedDate),
    sourceName: featuredNewsArticle.sourceDisplayName,
  }
}

const datasetFormatter = (dataset) => {
  const datasetAttributes = [
    'id',
    'name',
    'slug',
    'description',
    'url',
    'downloadUrl',
    'defaultExpanded',
  ]

  return pick(dataset, datasetAttributes)
}

const departmentDetailsFormatter = (department) => {
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
    'location',
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

  const sustainedComplaintsCount = get(department, 'sustainedComplaintsCount')
  const complaintsCount = get(department, 'complaintsCount')
  const sustainedComplaintPercentage = complaintsCount
    ? Math.round((100 * sustainedComplaintsCount) / complaintsCount)
    : 0

  return {
    ...pick(department, departmentAttributes),
    sustainedComplaintPercentage,
  }
}

const getDepartment = (state) => get(state.departmentPage, 'department', {})
const getFeaturedOfficers = (state) =>
  get(state.departmentPage, 'featuredOfficers', [])
const getFeaturedDocuments = (state) =>
  get(state.departmentPage, 'featuredDocuments', [])
const getFeaturedNewsArticles = (state) =>
  get(state.departmentPage, 'featuredNewsArticles', [])
const getDatasets = (state) => get(state.departmentPage, 'datasets', [])

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

export const featuredOfficersSelector = createSelector(
  getFeaturedOfficers,
  (featuredOfficers) => map(featuredOfficers, featuredOfficerFormatter)
)

export const featuredDocumentsSelector = createSelector(
  getFeaturedDocuments,
  (featuredDocuments) => map(featuredDocuments, featuredDocumentFormatter)
)

export const featuredNewsArticlesSelector = createSelector(
  getFeaturedNewsArticles,
  (featuredNewsArticles) =>
    map(featuredNewsArticles, featuredNewsArticleFormatter)
)

export const datasetsSelector = createSelector(getDatasets, (datasets) =>
  map(datasets, datasetFormatter)
)
