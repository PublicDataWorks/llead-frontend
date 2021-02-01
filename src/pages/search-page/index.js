import { connect } from 'react-redux'

import SearchPage from 'components/search-page'
import { search } from 'actions/search-page'
import { searchResultsSelector, getSearchQuery } from 'selectors/search-page'

const mapStateToProps = (state) => ({
  searchResults: searchResultsSelector(state),
  searchQuery: getSearchQuery(state),
})

const mapDispatchToProps = {
  search,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
