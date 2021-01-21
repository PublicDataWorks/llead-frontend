import { combineReducers } from 'redux'

import documentPageReducer from 'reducers/document-page'
import tokenReducer from 'reducers/token'

export default combineReducers({
  documentPage: documentPageReducer,
  token: tokenReducer,
})
