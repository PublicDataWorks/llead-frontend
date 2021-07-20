import { connect } from 'react-redux'

import App from 'components/app'
import { fetchAppConfig } from 'actions/common/app-config'
import { fetchRecentItems } from 'actions/common/recent-items'
import {
  isLoggedInSelector,
  isAppConfigFetchedSelector,
} from 'selectors/common'
import 'styles/fonts.scss'
import 'styles/base.scss'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedInSelector(state),
    isAppConfigFetched: isAppConfigFetchedSelector(state),
  }
}

const mapDispatchToProps = {
  fetchAppConfig,
  fetchRecentItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
