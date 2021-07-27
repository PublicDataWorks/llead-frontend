import { connect } from 'react-redux'

import Header from 'components/common/header'
import { isLoggedInSelector } from 'selectors/common'
import {
  getSearchQuery,
  searchQuerySuggestionsSelector,
} from 'selectors/search-page'
import { changeSearchQuery, fetchSearchQueries } from 'actions/search-page'

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  searchQuery: getSearchQuery(state),
  searchQuerySuggestions: searchQuerySuggestionsSelector(state),
})

const mapDispatchToProps = {
  changeSearchQuery,
  fetchSearchQueries,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
