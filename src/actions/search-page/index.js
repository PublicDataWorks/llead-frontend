import { createAction } from 'redux-actions'

import * as actionTypes from 'action-types/search-page'
import { get } from 'utils/api'
import { SEARCH_API_URL } from 'constants/api'

export const search = (query) =>
  get(
    [
      actionTypes.SEARCH_START,
      actionTypes.SEARCH_SUCCESS,
      actionTypes.SEARCH_FAILURE,
    ],
    SEARCH_API_URL
  )({ q: query })

export const changeSearchQuery = createAction(actionTypes.CHANGE_SEARCH_QUERY)
