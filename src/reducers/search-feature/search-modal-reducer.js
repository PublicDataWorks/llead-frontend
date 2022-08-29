import { handleActions } from 'redux-actions'

import { TOGGLE_SEARCH_MODAL } from 'action-types/common/search-feature'

export default handleActions(
  {
    [TOGGLE_SEARCH_MODAL]: (state, action) => action.payload,
  },
  false
)
