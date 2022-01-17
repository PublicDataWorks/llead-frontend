import { connect } from 'react-redux'

import {
  searchItemsSelector,
  searchItemsPaginationSelector,
} from 'selectors/department-page'
import {
  fetchSearchItems,
  clearDepartmentSearchResults,
} from 'actions/department-page'
import FeaturedSearch from 'components/department-page/featured-search'

const mapStateToProps = (state) => ({
  searchItems: searchItemsSelector(state),
  ...searchItemsPaginationSelector(state),
})

const mapDispatchToProps = {
  fetchSearchItems,
  clearDepartmentSearchResults,
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedSearch)
