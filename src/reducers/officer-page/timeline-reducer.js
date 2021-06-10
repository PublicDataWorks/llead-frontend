import { handleActions } from 'redux-actions'

import {
  OFFICER_TIMELINE_FETCH_START,
  OFFICER_TIMELINE_FETCH_SUCCESS,
} from 'action-types/officer-page'

export default handleActions(
  {
    [OFFICER_TIMELINE_FETCH_START]: (state, action) => {}, // eslint-disable-line no-unused-vars
    [OFFICER_TIMELINE_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
