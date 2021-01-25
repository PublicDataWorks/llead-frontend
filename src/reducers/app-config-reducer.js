import { handleActions } from 'redux-actions'

import { APP_CONFIG_FETCH_SUCCESS } from 'action-types/common/app-config'

export default handleActions(
  {
    [APP_CONFIG_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
