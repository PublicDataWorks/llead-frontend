import * as actionTypes from 'action-types/front-page'
import { get } from 'utils/api'

import { ANALYTIC_SUMMARY_API_URL } from 'constants/api'

export const fetchAnalyticSummary = () =>
  get(
    [
      actionTypes.ANALYTIC_SUMMARY_FETCH_START,
      actionTypes.ANALYTIC_SUMMARY_FETCH_SUCCESS,
      actionTypes.ANALYTIC_SUMMARY_FETCH_FAILURE,
    ],
    ANALYTIC_SUMMARY_API_URL
  )()
