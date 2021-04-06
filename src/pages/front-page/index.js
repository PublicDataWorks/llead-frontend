import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector } from 'selectors/common'
import {
  analyticSummarySelector,
  departmentsSelector,
  officersSelector,
  documentsSelector,
} from 'selectors/front-page'
import {
  recentItemsSelector,
  recentItemIdsSelector,
} from 'selectors/front-page/recent-items'
import { CMS_PAGES } from 'constants/common'
import {
  fetchAnalyticSummary,
  fetchRecentItems,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
} from 'actions/front-page'
import { saveRecentItem } from 'actions/common/recent-items'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_PAGES.FRONT_PAGE),
  analyticSummary: analyticSummarySelector(state),
  departments: departmentsSelector(state),
  officers: officersSelector(state),
  documents: documentsSelector(state),
  recentItemIds: recentItemIdsSelector(state),
  recentItems: recentItemsSelector(state),
})

const mapDispatchToProps = {
  fetchAnalyticSummary,
  fetchRecentItems,
  fetchDepartments,
  fetchOfficers,
  fetchDocuments,
  saveRecentItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
