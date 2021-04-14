import { handleActions } from 'redux-actions'

import { CHANGE_FILTER_GROUP_KEY } from 'action-types/officer-page'

export default handleActions(
  {
    [CHANGE_FILTER_GROUP_KEY]: (state, action) => action.payload,
  },
  ''
)
