import { handleActions } from 'redux-actions'

import {
  OFFICER_FETCH_START,
  OFFICER_FETCH_SUCCESS,
  OFFICER_FETCH_FAILURE,
} from 'action-types/officer-page'

export default handleActions(
  {
    [OFFICER_FETCH_START]: (state, action) => true, // eslint-disable-line no-unused-vars
    [OFFICER_FETCH_SUCCESS]: (state, action) => false, // eslint-disable-line no-unused-vars
    [OFFICER_FETCH_FAILURE]: (state, action) => false, // eslint-disable-line no-unused-vars
  },
  false
)
