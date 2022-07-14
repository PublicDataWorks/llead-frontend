import { handleActions } from 'redux-actions'

import {
  Q_AND_A_FETCH_START,
  Q_AND_A_FETCH_SUCCESS,
} from 'action-types/about-page'

export default handleActions(
  {
    [Q_AND_A_FETCH_START]: () => [],
    [Q_AND_A_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
