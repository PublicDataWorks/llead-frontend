import { combineReducers } from 'redux'

import documentPageReducer from 'reducers/document-page'
import userReducer from 'reducers/user'

export default combineReducers({
  documentPage: documentPageReducer,
  user: userReducer,
})
