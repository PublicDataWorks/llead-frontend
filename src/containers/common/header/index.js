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
import { fetchDepartment } from 'actions/department-page'
import { departmentSelector } from 'selectors/department-page'

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  searchQuery: getSearchQuery(state),
  searchDepartment: getSearchDepartment(state),
  searchQuerySuggestions: searchQuerySuggestionsSelector(state),
  fetchedDepartment: departmentSelector(state),
})

const mapDispatchToProps = {
  changeSearchQuery,
  fetchSearchQueries,
  changeSearchDepartment,
  fetchDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
