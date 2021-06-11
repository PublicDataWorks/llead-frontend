import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import AppRoutes from 'routes'
import HeaderContainer from 'containers/common/header'
import Footer from 'containers/common/footer'
import ScrollToTop from 'components/common/higher-order/scroll-to-top'
import './app.scss'

const App = (props) => {
  const { fetchAppConfig, isAppConfigFetched, isLoggedIn } = props
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    if (!isAppConfigFetched) {
      fetchAppConfig()
    }
  }, [isAppConfigFetched])

  return (
    <Router>
      <ScrollToTop />

      <div
        className={cx('main-container', { unauthorized: !isLoggedIn })}
        style={{ minHeight: `calc(100vh - ${footerHeight}px)` }}
      >
        <HeaderContainer />
        <AppRoutes />
      </div>
      <Footer setFooterHeight={setFooterHeight} />
    </Router>
  )
}

App.propTypes = {
  fetchAppConfig: PropTypes.func,
  isAppConfigFetched: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
}

App.defaultProps = {
  fetchAppConfig: noop,
  isAppConfigFetched: false,
  isLoggedIn: false,
}

export default App
