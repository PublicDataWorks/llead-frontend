import { handleActions } from 'redux-actions'

import { DOCUMENTS_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [DOCUMENTS_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
