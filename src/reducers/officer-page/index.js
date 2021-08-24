import { combineReducers } from 'redux'

import officerReducer from './officer-reducer'
import timelineReducer from './timeline-reducer'
import filterGroupKeyReducer from './filter-group-key-reducer'
import isRequestingReducer from './is-requesting-reducer'
import downloadFileReducer from './download-file-reducer'

export default combineReducers({
  officer: officerReducer,
  timeline: timelineReducer,
  filterGroupKey: filterGroupKeyReducer,
  isOfficerRequesting: isRequestingReducer,
  isDownloading: downloadFileReducer,
})
