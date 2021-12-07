import { combineReducers } from 'redux'

import searchResultsReducer from './search-results-reducer'
import searchQueryReducer from './search-query-reducer'
import searchQueriesReducer from './search-queries-reducer'
import searchDepartmentReducer from './search-department-reducer'

export default combineReducers({
  searchResults: searchResultsReducer,
  searchQuery: searchQueryReducer,
  searchDepartment: searchDepartmentReducer,
  searchQueries: searchQueriesReducer,
})
