import { combineReducers } from 'redux'

import documentPageReducer from 'reducers/document-page'
import tokenReducer from 'reducers/token-reducer'
import appConfigReducer from 'reducers/app-config-reducer'

export default combineReducers({
  token: tokenReducer,
  appConfig: appConfigReducer,
  documentPage: documentPageReducer,
})
