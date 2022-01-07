import { handleActions } from 'redux-actions'

import {
  DEPARTMENT_DATASETS_FETCH_START,
  DEPARTMENT_DATASETS_FETCH_SUCCESS,
} from 'action-types/department-page'

export default handleActions(
  {
    [DEPARTMENT_DATASETS_FETCH_START]: () => [],
    [DEPARTMENT_DATASETS_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  []
)
