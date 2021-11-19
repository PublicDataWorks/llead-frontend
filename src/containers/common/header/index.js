import { connect } from 'react-redux'

import Header from 'components/common/header'
import { isLoggedInSelector } from 'selectors/common'
import {
  getSearchQuery,
  getSearchDepartment,
  searchQuerySuggestionsSelector,
} from 'selectors/search-page'
import {
  changeSearchQuery,
  fetchSearchQueries,
  changeSearchDepartment,
} from 'actions/search-page'

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  searchQuery: getSearchQuery(state),
  searchDepartment: getSearchDepartment(state),
  searchQuerySuggestions: searchQuerySuggestionsSelector(state),
})

const mapDispatchToProps = {
  changeSearchQuery,
  fetchSearchQueries,
  changeSearchDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
