import { connect } from 'react-redux'

import ParticularSearchComponent from 'components/common/search-feature/particular-search'
import {
  searchResultsSelector,
  getIsSearching,
  getIsLoadingResult,
} from 'selectors/common/search-feature'

const mapStateToProps = (state) => ({
  ...searchResultsSelector(state),
  isSearching: getIsSearching(state),
  isLoadingResult: getIsLoadingResult(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticularSearchComponent)
