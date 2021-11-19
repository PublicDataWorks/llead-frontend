import { handleActions } from 'redux-actions'

import { CHANGE_SEARCH_DEPARTMENT } from 'action-types/search-page'

export default handleActions(
  {
    [CHANGE_SEARCH_DEPARTMENT]: (state, action) => action.payload,
  },
  ''
)
