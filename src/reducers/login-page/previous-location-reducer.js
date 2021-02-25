import { handleActions } from 'redux-actions'

import { SET_PREVIOUS_LOCATION } from 'action-types/common/private-route'

export default handleActions(
  {
    [SET_PREVIOUS_LOCATION]: (state, action) => action.payload,
  },
   null
)
