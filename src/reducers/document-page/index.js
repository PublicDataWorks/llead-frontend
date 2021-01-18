import { combineReducers } from 'redux'

import documentReducer from './document-reducer'

export default combineReducers({
  document: documentReducer,
})
