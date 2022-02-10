import { handleActions } from 'redux-actions'
import compact from 'lodash/compact'
import concat from 'lodash/concat'
import get from 'lodash/get'

import {
  SEARCH_ITEMS_START,
  SEARCH_ITEMS_SUCCESS,
  CLEAR_DEPARTMENT_SEARCH_RESULTS,
} from 'action-types/department-page'

export default handleActions(
  {
    [SEARCH_ITEMS_START]: (state, action) =>
      get(action, 'request.params.limit') ? state : [],
    [CLEAR_DEPARTMENT_SEARCH_RESULTS]: () => [],
    [SEARCH_ITEMS_SUCCESS]: (state, action) =>
      action.payload.previous
        ? compact(concat(state, action.payload.results))
        : action.payload.results,
  },
  []
)
