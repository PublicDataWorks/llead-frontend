import { handleActions } from 'redux-actions'

import { CHANGE_SEARCH_QUERY } from 'action-types/search-page'

export default handleActions(
  {
    [CHANGE_SEARCH_QUERY]: (state, action) => action.payload,
  },
  ''
)
