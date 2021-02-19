import { combineReducers } from 'redux'

import searchResultsReducer from './search-results-reducer'
import searchQueryReducer from './search-query-reducer'

export default combineReducers({
  searchResults: searchResultsReducer,
  searchQuery: searchQueryReducer,
})
