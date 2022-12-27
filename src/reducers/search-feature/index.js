import { combineReducers } from 'redux'

import searchResultsReducer from './search-results-reducer'
import searchAllResultsReducer from './search-all-results-reducer'
import searchCountReducer from './search-count-reducer'
import searchQueryReducer from './search-query-reducer'
import searchQueriesReducer from './search-queries-reducer'
import searchModalReducer from './search-modal-reducer'
import isSearchingReducer from './is-searching-reducer'
import isResultLoadingReducer from './is-result-loading-reducer'

export default combineReducers({
  searchAllResults: searchAllResultsReducer,
  searchResults: searchResultsReducer,
  searchQuery: searchQueryReducer,
  searchQueries: searchQueriesReducer,
  searchCount: searchCountReducer,
  isSearchModalOpen: searchModalReducer,
  isSearching: isSearchingReducer,
  isResultLoading: isResultLoadingReducer,
})
