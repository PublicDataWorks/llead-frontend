import { handleActions } from 'redux-actions'

import { DEPARTMENTS_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [DEPARTMENTS_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
