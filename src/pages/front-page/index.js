import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector } from 'selectors/common'
import {
  analyticSummarySelector,
  departmentsSelector,
  officersSelector,
} from 'selectors/front-page'
import { CMS_PAGES } from 'constants/common'
import {
  fetchAnalyticSummary,
  fetchDepartments,
  fetchOfficers,
} from 'actions/front-page'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_PAGES.FRONT_PAGE),
  analyticSummary: analyticSummarySelector(state),
  departments: departmentsSelector(state),
  officers: officersSelector(state),
})

const mapDispatchToProps = {
  fetchAnalyticSummary,
  fetchDepartments,
  fetchOfficers,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
