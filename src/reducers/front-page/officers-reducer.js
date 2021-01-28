import { handleActions } from 'redux-actions'

import { OFFICERS_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [OFFICERS_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
