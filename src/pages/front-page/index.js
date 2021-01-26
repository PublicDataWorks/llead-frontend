import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector } from 'selectors/common'
import {
  analyticSummarySelector,
  departmentsSelector,
} from 'selectors/front-page'
import { CMS_PAGES } from 'constants/common'
import { fetchAnalyticSummary, fetchDepartments } from 'actions/front-page'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_PAGES.FRONT_PAGE),
  analyticSummary: analyticSummarySelector(state),
  departments: departmentsSelector(state),
})

const mapDispatchToProps = {
  fetchAnalyticSummary,
  fetchDepartments,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
