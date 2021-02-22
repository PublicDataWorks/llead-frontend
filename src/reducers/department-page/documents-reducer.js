import { handleActions } from 'redux-actions'
import compact from 'lodash/compact'
import concat from 'lodash/concat'

import { DOCUMENTS_FETCH_SUCCESS } from 'action-types/department-page'

export default handleActions(
  {
    [DOCUMENTS_FETCH_SUCCESS]: (state, action) =>
      action.payload.previous
        ? compact(concat(state, action.payload.results))
        : action.payload.results,
  },
  {}
)
