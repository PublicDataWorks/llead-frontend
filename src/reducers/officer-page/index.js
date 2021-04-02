import { combineReducers } from 'redux'

import officerReducer from './officer-reducer'
import timelineReducer from './timeline-reducer'
import documentsReducer from './documents-reducer'
import isRequestingReducer from './is-requesting-reducer'

export default combineReducers({
  officer: officerReducer,
  documents: documentsReducer,
  timeline: timelineReducer,
  isOfficerRequesting: isRequestingReducer,
})
