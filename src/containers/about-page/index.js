import { connect } from 'react-redux'

import AboutPage from 'components/about-page'
import { getQAA } from 'selectors/about-page'
import { cmsSelector } from 'selectors/common'
import { CMS_SECTIONS } from 'constants/common'
import { fetchQAA } from 'actions/about-page'

const mapStateToProps = (state) => ({
  cms: cmsSelector(state, CMS_SECTIONS.ABOUT_PAGE),
  qAA: getQAA(state),
})

const mapDispatchToProps = {
  fetchQAA,
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)
