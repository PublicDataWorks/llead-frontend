import { createAction } from 'redux-actions'

import * as actionTypes from 'action-types/front-page'
import { get } from 'utils/api'

import {
  ANALYTIC_SUMMARY_API_URL,
  DEPARTMENTS_API_URL,
  OFFICERS_API_URL,
  DOCUMENTS_API_URL,
  NEWS_ARTICLES_API_URL,
  FRONT_PAGE_ORDERS_API_URL,
} from 'constants/api'

export const fetchAnalyticSummary = () =>
  get(
    [
      actionTypes.ANALYTIC_SUMMARY_FETCH_START,
      actionTypes.ANALYTIC_SUMMARY_FETCH_SUCCESS,
      actionTypes.ANALYTIC_SUMMARY_FETCH_FAILURE,
    ],
    ANALYTIC_SUMMARY_API_URL
  )()

export const fetchDepartments = () =>
  get(
    [
      actionTypes.DEPARTMENTS_FETCH_START,
      actionTypes.DEPARTMENTS_FETCH_SUCCESS,
      actionTypes.DEPARTMENTS_FETCH_FAILURE,
    ],
    DEPARTMENTS_API_URL
  )()

export const fetchOfficers = () =>
  get(
    [
      actionTypes.OFFICERS_FETCH_START,
      actionTypes.OFFICERS_FETCH_SUCCESS,
      actionTypes.OFFICERS_FETCH_FAILURE,
    ],
    OFFICERS_API_URL
  )()

export const fetchDocuments = () =>
  get(
    [
      actionTypes.DOCUMENTS_FETCH_START,
      actionTypes.DOCUMENTS_FETCH_SUCCESS,
      actionTypes.DOCUMENTS_FETCH_FAILURE,
    ],
    DOCUMENTS_API_URL
  )()

export const fetchNewsArticles = () =>
  get(
    [
      actionTypes.NEWS_ARTICLES_FETCH_START,
      actionTypes.NEWS_ARTICLES_FETCH_SUCCESS,
      actionTypes.NEWS_ARTICLES_FETCH_FAILURE,
    ],
    NEWS_ARTICLES_API_URL
  )()

export const fetchFrontPageOrders = () =>
  get(
    [
      actionTypes.FRONT_PAGE_ORDERS_FETCH_START,
      actionTypes.FRONT_PAGE_ORDERS_FETCH_SUCCESS,
      actionTypes.FRONT_PAGE_ORDERS_FETCH_FAILURE,
    ],
    FRONT_PAGE_ORDERS_API_URL
  )()

export const fetchMigratoryData = () =>
  get(
    [
      actionTypes.MIGRATORY_DATA_FETCH_START,
      actionTypes.MIGRATORY_DATA_FETCH_SUCCESS,
      actionTypes.MIGRATORY_DATA_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}migratory/`
  )()

export const setMapCurrentIndex = createAction(
  actionTypes.SET_MAP_CURRENT_INDEX
)
