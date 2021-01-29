import { combineReducers } from 'redux'

import analyticSummaryReducer from './analytic-summary-reducer'
import departmentsReducer from './departments-reducer'
import officersReducer from './officers-reducer'

export default combineReducers({
  analyticSummary: analyticSummaryReducer,
  departments: departmentsReducer,
  officers: officersReducer,
})
