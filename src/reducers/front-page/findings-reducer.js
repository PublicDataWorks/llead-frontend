import { handleActions } from 'redux-actions'

import { FINDINGS_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [FINDINGS_FETCH_SUCCESS]: (_, action) => action.payload,
  },
  {}
)
