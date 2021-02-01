import { handleActions } from 'redux-actions'
import isEmpty from 'lodash/isEmpty'

import { SEARCH_SUCCESS, CHANGE_SEARCH_QUERY } from 'action-types/search-page'

export default handleActions(
  {
    [SEARCH_SUCCESS]: (state, action) => action.payload,
    [CHANGE_SEARCH_QUERY]: (state, action) =>
      isEmpty(action.payload) ? {} : state,
  },
  {}
)
