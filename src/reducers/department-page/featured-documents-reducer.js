import { handleActions } from 'redux-actions'

import {
  DEPARTMENT_FEATURED_DOCUMENTS_FETCH_START,
  DEPARTMENT_FEATURED_DOCUMENTS_FETCH_SUCCESS,
} from 'action-types/department-page'

export default handleActions(
  {
    [DEPARTMENT_FEATURED_DOCUMENTS_FETCH_START]: () => [],
    [DEPARTMENT_FEATURED_DOCUMENTS_FETCH_SUCCESS]: (state, action) =>
      action.payload,
  },
  []
)
