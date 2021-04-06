import { connect } from 'react-redux'

import Header from 'components/common/header'
import { isLoggedInSelector, getRefreshToken } from 'selectors/common'
import {
  getSearchQuery,
  searchQuerySuggestionsSelector,
} from 'selectors/search-page'
import { logOut } from 'actions/authentication'
import { changeSearchQuery } from 'actions/search-page'

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  searchQuery: getSearchQuery(state),
  refreshToken: getRefreshToken(state),
  searchQuerySuggestions: searchQuerySuggestionsSelector(state),
})

const mapDispatchToProps = {
  logOut,
  changeSearchQuery,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
