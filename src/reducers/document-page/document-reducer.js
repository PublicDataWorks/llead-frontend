import { handleActions } from 'redux-actions'

import { DOCUMENT_FETCH_SUCCESS } from 'action-types/document-page'

export default handleActions(
  {
    [DOCUMENT_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
