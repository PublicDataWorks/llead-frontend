import { createAction } from 'redux-actions'
import { CancelToken } from 'axios'

import * as actionTypes from 'action-types/search-page'
import { get, post } from 'utils/api'
import { SEARCH_API_URL, RECENT_QUERIES_API_URL } from 'constants/api'
import { REQUEST_CANCEL_MESSAGE } from 'constants/common'

let cancelTokenSource

const cancelOldRequest = (newRequest) => (...args) => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel(REQUEST_CANCEL_MESSAGE)
  }
  cancelTokenSource = CancelToken.source()
  return newRequest(...args)
}

export const search = cancelOldRequest((query) =>
  get(
    [
      actionTypes.SEARCH_START,
      actionTypes.SEARCH_SUCCESS,
      actionTypes.SEARCH_FAILURE,
    ],
    SEARCH_API_URL,
    cancelTokenSource.token
  )({ q: query })
)

export const changeSearchQuery = createAction(actionTypes.CHANGE_SEARCH_QUERY)

export const saveSearchQuery = (query) =>
  post(
    [
      actionTypes.SAVE_SEARCH_QUERY_START,
      actionTypes.SAVE_SEARCH_QUERY_SUCCESS,
      actionTypes.SAVE_SEARCH_QUERY_FAILURE,
    ],
    RECENT_QUERIES_API_URL,
    cancelTokenSource.token
  )({ q: query })

export const fetchSearchQueries = () =>
  get(
    [
      actionTypes.SEARCH_QUERIES_FETCH_START,
      actionTypes.SEARCH_QUERIES_FETCH_SUCCESS,
      actionTypes.SEARCH_QUERIES_FETCH_FAILURE,
    ],
    RECENT_QUERIES_API_URL
  )()
