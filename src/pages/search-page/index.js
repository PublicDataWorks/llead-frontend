import { connect } from 'react-redux'

import SearchPage from 'components/search-page'
import { search, saveSearchQuery } from 'actions/search-page'
import { searchResultsSelector, getSearchQuery } from 'selectors/search-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  searchResults: searchResultsSelector(state),
  searchQuery: getSearchQuery(state),
})

const mapDispatchToProps = {
  search,
  saveRecentItem,
  saveSearchQuery,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
