import { connect } from 'react-redux'

import Findings from 'components/front-page/findings'
import { findingsSelector } from 'selectors/front-page'
import { fetchFindings } from 'actions/front-page'

const mapStateToProps = (state) => ({
  findings: findingsSelector(state),
})

const mapDispatchToProps = {
  fetchFindings,
}

export default connect(mapStateToProps, mapDispatchToProps)(Findings)
