import { connect } from 'react-redux'

import DocumentsListComponent from 'components/search-page/search-results/documents-list'
import { getSearchQuery } from 'selectors/search-page'
import { changeSearchQuery } from 'actions/search-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  searchQuery: getSearchQuery(state),
})

const mapDispatchToProps = {
  saveRecentItem,
  changeSearchQuery,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsListComponent)
