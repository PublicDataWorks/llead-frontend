import { handleActions } from 'redux-actions'

import {
  OFFICER_DOCUMENTS_FETCH_START,
  OFFICER_DOCUMENTS_FETCH_SUCCESS,
} from 'action-types/officer-page'

export default handleActions(
  {
    [OFFICER_DOCUMENTS_FETCH_START]: (state, action) => [], // eslint-disable-line no-unused-vars
    [OFFICER_DOCUMENTS_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
