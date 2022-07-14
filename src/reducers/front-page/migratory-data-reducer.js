import { handleActions } from 'redux-actions'

import { MIGRATORY_DATA_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [MIGRATORY_DATA_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
