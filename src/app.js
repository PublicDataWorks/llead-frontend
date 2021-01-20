import { connect } from 'react-redux'

import App from 'components/app'
import { fetchAppConfig } from 'actions/common/app-config'
import { isAppConfigFetchedSelector } from 'selectors/common'

const mapStateToProps = (state) => {
  return {
    isAppConfigFetched: isAppConfigFetchedSelector(state),
  }
}

const mapDispatchToProps = {
  fetchAppConfig,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
