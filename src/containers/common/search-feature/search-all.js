import { connect } from 'react-redux'

import SearchAllComponent from 'components/common/search-feature/search-all'
import {
  getIsLoadingResult,
  searchAllResultsSelector,
} from 'selectors/common/search-feature'

const mapStateToProps = (state) => ({
  searchAllResults: searchAllResultsSelector(state),
  isLoadingResult: getIsLoadingResult(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAllComponent)
