import { connect } from 'react-redux'

import Footer from 'components/common/footer'
import { CMS_SECTIONS } from 'constants/common'
import { cmsSelector } from 'selectors/common'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_SECTIONS.FOOTER),
})

export default connect(mapStateToProps, null)(Footer)
