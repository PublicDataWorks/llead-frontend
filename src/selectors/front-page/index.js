import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'
import reduce from 'lodash/reduce'

import {
  departmentFormatter,
  officerFormatter,
  documentFormatter,
  newsArticleFormatter,
} from 'selectors/common'

const getAnalyticSummary = (state) =>
  get(state.frontPage, 'analyticSummary', {})

const getDepartments = (state) => get(state.frontPage, 'departments', [])
const getOfficers = (state) => get(state.frontPage, 'officers', [])
const getDocuments = (state) => get(state.frontPage, 'documents', [])
const getNewsArticles = (state) => get(state.frontPage, 'newsArticles', [])
const getFrontPageOrders = (state) =>
  get(state.frontPage, 'frontPageOrders', [])

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

export const newsArticlesSelector = (state) => {
  return map(getNewsArticles(state), newsArticleFormatter)
}

export const frontPageOrdersSelector = createSelector(
  getFrontPageOrders,
  (frontPageOrders) =>
    reduce(
      frontPageOrders,
      (formattedOrders, item) => ({
        ...formattedOrders,
        [item.section]: item.order,
      }),
      {}
    )
)
