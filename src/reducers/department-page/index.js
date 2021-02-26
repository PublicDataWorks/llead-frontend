import { combineReducers } from 'redux'

import departmentReducer from './department-reducer'
import documentsReducer from './documents-reducer'
import documentsPaginationReducer from './documents-pagination-reducer'
import isRequestingReducer from './is-requesting-reducer'

export default combineReducers({
  department: departmentReducer,
  documents: documentsReducer,
  documentsPagination: documentsPaginationReducer,
  isRequesting: isRequestingReducer,
})
