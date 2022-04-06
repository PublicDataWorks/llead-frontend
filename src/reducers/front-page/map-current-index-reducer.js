import { handleActions } from 'redux-actions'

import { SET_MAP_CURRENT_INDEX } from 'action-types/front-page'

export default handleActions(
  {
    [SET_MAP_CURRENT_INDEX]: (state, action) => action.payload,
  },
  0
)
