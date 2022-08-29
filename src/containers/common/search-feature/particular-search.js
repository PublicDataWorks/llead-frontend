import { connect } from 'react-redux'

import ParticularSearchComponent from 'components/common/search-feature/particular-search'
import {
  searchResultsSelector,
  getIsSearching,
} from 'selectors/common/search-feature'

const mapStateToProps = (state) => ({
  ...searchResultsSelector(state),
  isSearching: getIsSearching(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticularSearchComponent)
