import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import AppRoutes from 'routes'
import HeaderContainer from 'containers/common/header-container'
import Footer from 'components/common/footer'
import ScrollToTop from 'components/common/higher-order/scroll-to-top'
import './app.scss'

const App = (props) => {
  const { fetchAppConfig, isAppConfigFetched, isLoggedIn } = props
  const footerRef = useRef()
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    if (!isAppConfigFetched) {
      fetchAppConfig()
    }
  }, [isAppConfigFetched])

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight)
    }
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <HeaderContainer />
      <div
        className={cx('main-container', { unauthorized: !isLoggedIn })}
        style={{ minHeight: `calc(100vh - ${footerHeight}px)` }}
      >
        <AppRoutes />
      </div>
      <Footer ref={footerRef} />
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
