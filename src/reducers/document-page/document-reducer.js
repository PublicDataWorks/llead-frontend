import { handleActions } from 'redux-actions'

import { FETCH_DOCUMENT_SUCCESS } from 'action-types/document-page'

export default handleActions(
  {
    [FETCH_DOCUMENT_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
