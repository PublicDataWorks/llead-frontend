import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector } from 'selectors/common'
import {
  analyticSummarySelector,
  departmentsSelector,
  officersSelector,
  documentsSelector,
  newsArticlesSelector,
} from 'selectors/front-page'
import { recentItemsSelector } from 'selectors/front-page/recent-items'
import { CMS_SECTIONS } from 'constants/common'
import {
  fetchAnalyticSummary,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  fetchNewsArticles,
} from 'actions/front-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_SECTIONS.FRONT_PAGE),
  analyticSummary: analyticSummarySelector(state),
  departments: departmentsSelector(state),
  officers: officersSelector(state),
  documents: documentsSelector(state),
  newsArticles: newsArticlesSelector(state),
  recentItems: recentItemsSelector(state),
})

const mapDispatchToProps = {
  fetchAnalyticSummary,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  fetchNewsArticles,
  saveRecentItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
