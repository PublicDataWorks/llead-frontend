import { handleActions } from 'redux-actions'

import { FETCH_DOCUMENT_SUCCESS } from 'pages/document-page/services/action-types'

export default handleActions(
  {
    [FETCH_DOCUMENT_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
