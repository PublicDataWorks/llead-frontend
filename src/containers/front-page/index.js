import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector, getIsAdmin } from 'selectors/common'
import {
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
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  fetchNewsArticles,
  fetchFrontPageOrders,
  fetchMigratoryData,
  hideNewsArticle,
} from 'actions/front-page'
import { saveRecentItem, removeRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_SECTIONS.FRONT_PAGE),
  departments: departmentsSelector(state),
  officers: officersSelector(state),
  documents: documentsSelector(state),
  newsArticles: newsArticlesSelector(state),
  recentItems: recentItemsSelector(state),
  frontPageOrders: frontPageOrdersSelector(state),
  isAdmin: getIsAdmin(state),
})

const mapDispatchToProps = {
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  fetchNewsArticles,
  fetchFrontPageOrders,
  fetchMigratoryData,
  saveRecentItem,
  removeRecentItem,
  changeSearchQuery,
  changeSearchDepartment,
  hideNewsArticle,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
