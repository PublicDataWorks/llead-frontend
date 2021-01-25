import { handleActions } from 'redux-actions'

import { ANALYTIC_SUMMARY_FETCH_SUCCESS } from 'action-types/front-page'

export default handleActions(
  {
    [ANALYTIC_SUMMARY_FETCH_SUCCESS]: (state, action) => action.payload,
  },
  {}
)
