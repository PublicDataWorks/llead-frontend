import { handleActions } from 'redux-actions'

import {
  DEPARTMENT_FETCH_START,
  DEPARTMENT_FETCH_SUCCESS,
} from 'action-types/department-page'

export default handleActions(
  {
    [DEPARTMENT_FETCH_START]: (state, action) => ({}), // eslint-disable-line no-unused-vars
    [DEPARTMENT_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
