import { combineReducers } from 'redux'

import officerReducer from './officer-reducer'
import documentsReducer from './documents-reducer'
import isRequestingReducer from './is-requesting-reducer'

export default combineReducers({
  officer: officerReducer,
  documents: documentsReducer,
  isOfficerRequesting: isRequestingReducer,
})
