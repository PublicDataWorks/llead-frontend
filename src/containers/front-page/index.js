import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector } from 'selectors/common'
import {
  analyticSummarySelector,
  departmentsSelector,
  officersSelector,
  documentsSelector,
  newsArticlesSelector,
  frontPageOrdersSelector,
} from 'selectors/front-page'
import { changeSearchQuery, changeSearchDepartment } from 'actions/search-page'
import { recentItemsSelector } from 'selectors/front-page/recent-items'
import { CMS_SECTIONS } from 'constants/common'
import {
  fetchAnalyticSummary,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  fetchNewsArticles,
  fetchFrontPageOrders,
} from 'actions/front-page'
import { saveRecentItem, removeRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_SECTIONS.FRONT_PAGE),
  analyticSummary: analyticSummarySelector(state),
  departments: departmentsSelector(state),
  officers: officersSelector(state),
  documents: documentsSelector(state),
  newsArticles: newsArticlesSelector(state),
  recentItems: recentItemsSelector(state),
  frontPageOrders: frontPageOrdersSelector(state),
})

const mapDispatchToProps = {
  fetchAnalyticSummary,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  fetchNewsArticles,
  fetchFrontPageOrders,
  saveRecentItem,
  removeRecentItem,
  changeSearchQuery,
  changeSearchDepartment,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
