import uniq from 'lodash/uniq'
import slice from 'lodash/slice'
import { handleActions } from 'redux-actions'

import {
  SAVE_SEARCH_QUERY_START,
  SEARCH_QUERIES_FETCH_SUCCESS,
} from 'action-types/search-page'
import { MAX_SEARCH_QUERIES } from 'constants/common'

export default handleActions(
  {
    [SAVE_SEARCH_QUERY_START]: (state, action) =>
      slice(uniq([action.request.data.q, ...state]), 0, MAX_SEARCH_QUERIES),
    [SEARCH_QUERIES_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
