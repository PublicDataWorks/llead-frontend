import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector } from 'selectors/common'
import { analyticSummarySelector } from 'selectors/front-page'
import { CMS_PAGES } from 'constants/common'
import { fetchAnalyticSummary } from 'actions/front-page'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_PAGES.FRONT_PAGE),
  analyticSummary: analyticSummarySelector(state),
})

const mapDispatchToProps = {
  fetchAnalyticSummary,
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
