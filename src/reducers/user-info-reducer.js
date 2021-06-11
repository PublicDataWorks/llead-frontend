import { handleActions } from 'redux-actions'

import { USER_INFO_FETCH_SUCCESS } from 'action-types/common/user-info'

export default handleActions(
  {
    [USER_INFO_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
