import { connect } from 'react-redux'

import SearchFeature from 'components/common/search-feature'
import {
  search,
  searchAll,
  saveSearchQuery,
  flushSearch,
  changeSearchQuery,
  fetchSearchQueries,
} from 'actions/common/search-feature'
import {
  getSearchQuery,
  searchQuerySuggestionsSelector,
  getSearchCount,
} from 'selectors/common/search-feature'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  searchQuery: getSearchQuery(state),
  searchCount: getSearchCount(state),
  searchQuerySuggestions: searchQuerySuggestionsSelector(state),
})

const mapDispatchToProps = {
  search,
  searchAll,
  saveRecentItem,
  saveSearchQuery,
  flushSearch,
  changeSearchQuery,
  fetchSearchQueries,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFeature)
