import { handleActions } from 'redux-actions'

import {
  OFFICER_FETCH_START,
  OFFICER_FETCH_SUCCESS,
  CLEAR_OFFICER,
} from 'action-types/officer-page'

export default handleActions(
  {
    [CLEAR_OFFICER]: (state, action) => ({}), // eslint-disable-line no-unused-vars
    [OFFICER_FETCH_START]: (state, action) => ({}), // eslint-disable-line no-unused-vars
    [OFFICER_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
