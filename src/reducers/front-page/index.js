import { combineReducers } from 'redux'

import analyticSummaryReducer from './analytic-summary-reducer'

export default combineReducers({
  analyticSummary: analyticSummaryReducer,
})
