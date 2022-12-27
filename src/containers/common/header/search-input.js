import { connect } from 'react-redux'

import {
  changeSearchQuery,
  fetchSearchQueries,
} from 'actions/common/search-feature'
import {
  getIsLoadingResult,
  getSearchQuery,
  searchQuerySuggestionsSelector,
} from 'selectors/common/search-feature'
import SearchInput from 'components/common/header/search-input'

const mapStateToProps = (state) => ({
  isLoadingResult: getIsLoadingResult(state),
  searchQuery: getSearchQuery(state),
  searchQuerySuggestions: searchQuerySuggestionsSelector(state),
})

const mapDispatchToProps = {
  changeSearchQuery,
  fetchSearchQueries,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
