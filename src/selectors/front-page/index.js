import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

import {
  departmentFormatter,
  officerFormatter,
  documentFormatter,
  newsArticleFormatter,
} from 'selectors/common'

const getDepartments = (state) => get(state, 'frontPage.departments', [])
const getOfficers = (state) => get(state.frontPage, 'officers', [])
const getDocuments = (state) => get(state.frontPage, 'documents', [])
const getNewsArticles = (state) => get(state.frontPage, 'newsArticles', [])
const getFindings = (state) => get(state.frontPage, 'findings', {})
const getFrontPageOrders = (state) =>
  get(state.frontPage, 'frontPageOrders', [])

export const departmentsSelector = createSelector(
  getDepartments,
  (departments) => map(departments, departmentFormatter)
)

export const officersSelector = createSelector(getOfficers, (officers) =>
  map(officers, officerFormatter)
)

export const documentsSelector = createSelector(getDocuments, (documents) =>
  map(documents, documentFormatter)
)

export const newsArticlesSelector = createSelector(
  getNewsArticles,
  (articles) => map(articles, newsArticleFormatter)
)

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

export const findingsSelector = createSelector(
  getFindings,
  (findings) => findings
)
