import { combineReducers } from 'redux'

import documentPageReducer from 'pages/document-page/services/reducers'

export default combineReducers({
  documentPage: documentPageReducer,
})
