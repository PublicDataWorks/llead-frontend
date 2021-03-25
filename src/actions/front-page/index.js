import * as actionTypes from 'action-types/front-page'
import { get } from 'utils/api'

import {
  ANALYTIC_SUMMARY_API_URL,
  RECENT_ITEMS_API_URL,
  DEPARTMENTS_API_URL,
  OFFICERS_API_URL,
  DOCUMENTS_API_URL,
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

export const fetchRecentItems = (params) =>
  get(
    [
      actionTypes.RECENT_ITEMS_FETCH_START,
      actionTypes.RECENT_ITEMS_FETCH_SUCCESS,
      actionTypes.RECENT_ITEMS_FETCH_FAILURE,
    ],
    RECENT_ITEMS_API_URL
  )(params)

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
