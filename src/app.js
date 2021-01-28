import { connect } from 'react-redux'

import App from 'components/app'
import { fetchAppConfig } from 'actions/common/app-config'
import { isAppConfigFetchedSelector } from 'selectors/common'
import 'styles/fonts.scss'
import 'styles/base.scss'

const mapStateToProps = (state) => {
  return {
    isAppConfigFetched: isAppConfigFetchedSelector(state),
  }
}

const mapDispatchToProps = {
  fetchAppConfig,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
