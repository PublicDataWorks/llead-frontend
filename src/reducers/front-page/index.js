import { combineReducers } from 'redux'

import analyticSummaryReducer from './analytic-summary-reducer'
import departmentsReducer from './departments-reducer'

export default combineReducers({
  analyticSummary: analyticSummaryReducer,
  departments: departmentsReducer,
})
