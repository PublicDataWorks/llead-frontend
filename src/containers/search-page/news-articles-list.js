import { connect } from 'react-redux'

import NewsArticlesListComponent from 'components/search-page/search-results/news-articles-list'
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
)(NewsArticlesListComponent)
