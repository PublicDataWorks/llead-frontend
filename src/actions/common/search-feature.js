import { createAction } from 'redux-actions'
import { CancelToken } from 'axios'

import * as actionTypes from 'action-types/common/search-feature'
import { get, post } from 'utils/api'
import { SEARCH_API_URL, RECENT_QUERIES_API_URL } from 'constants/api'
import { REQUEST_CANCEL_MESSAGE } from 'constants/common'

const cancelOldRequest = (newRequest, cancelTokenSource) => (...args) => {
  if (cancelTokenSource.source) {
    cancelTokenSource.source.cancel(REQUEST_CANCEL_MESSAGE)
  }
  cancelTokenSource.source = CancelToken.source()
  return newRequest(...args)
}

let searchCTS = {}
export const search = cancelOldRequest(
  ({ query, docType, limit, offset, department }) =>
    get(
      [
        actionTypes.SEARCH_START,
        actionTypes.SEARCH_SUCCESS,
        actionTypes.SEARCH_FAILURE,
      ],
      SEARCH_API_URL,
      searchCTS.source.token
    )({ q: query, limit, offset, doc_type: docType, department }),
  searchCTS
)

let searchAllCTS = {}
export const searchAll = cancelOldRequest(
  ({ query, docType, limit, offset, department }) =>
    get(
      [
        actionTypes.SEARCH_ALL_START,
        actionTypes.SEARCH_ALL_SUCCESS,
        actionTypes.SEARCH_ALL_FAILURE,
      ],
      SEARCH_API_URL,
      searchAllCTS.source.token
    )({ q: query, limit, offset, doc_type: docType, department }),
  searchAllCTS
)

export const changeSearchQuery = createAction(actionTypes.CHANGE_SEARCH_QUERY)

export const flushSearch = createAction(actionTypes.FLUSH_SEARCH)

export const saveSearchQuery = (query) =>
  post(
    [
      actionTypes.SAVE_SEARCH_QUERY_START,
      actionTypes.SAVE_SEARCH_QUERY_SUCCESS,
      actionTypes.SAVE_SEARCH_QUERY_FAILURE,
    ],
    RECENT_QUERIES_API_URL
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

export const toggleSearchModal = createAction(actionTypes.TOGGLE_SEARCH_MODAL)
