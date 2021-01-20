import { connect } from 'react-redux'

import FrontPage from 'components/front-page'
import { cmsSelector } from 'selectors/common'
import { CMS_PAGES } from 'constants/common'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_PAGES.FRONT_PAGE),
})

export default connect(mapStateToProps)(FrontPage)
