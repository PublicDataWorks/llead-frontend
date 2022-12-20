import { handleActions } from 'redux-actions'

import {
  DEPARTMENT_MIGRATORY_DATA_FETCH_SUCCESS,
  DEPARTMENT_DATASETS_FETCH_START,
} from 'action-types/department-page'

export default handleActions(
  {
    [DEPARTMENT_DATASETS_FETCH_START]: () => {},
    [DEPARTMENT_MIGRATORY_DATA_FETCH_SUCCESS]: (state, action) =>
      action.payload,
  },
  {}
)
