import { combineReducers } from 'redux'

import searchResultsReducer from './search-results-reducer'
import searchQueryReducer from './search-query-reducer'
import searchQueriesReducer from './search-queries-reducer'

export default combineReducers({
  searchResults: searchResultsReducer,
  searchQuery: searchQueryReducer,
  searchQueries: searchQueriesReducer,
})
