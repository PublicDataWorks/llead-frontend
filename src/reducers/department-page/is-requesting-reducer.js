import { handleActions } from 'redux-actions'

import {
  DEPARTMENT_FETCH_START,
  DEPARTMENT_FETCH_SUCCESS,
  DEPARTMENT_FETCH_FAILURE,
} from 'action-types/department-page'

export default handleActions(
  {
    [DEPARTMENT_FETCH_START]: (state, action) => true, // eslint-disable-line no-unused-vars
    [DEPARTMENT_FETCH_SUCCESS]: (state, action) => false, // eslint-disable-line no-unused-vars
    [DEPARTMENT_FETCH_FAILURE]: (state, action) => false, // eslint-disable-line no-unused-vars
  },
  false
)
