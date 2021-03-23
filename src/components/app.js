import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import AppRoutes from 'routes'
import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import './app.scss'

const App = (props) => {
  const { fetchAppConfig, isAppConfigFetched } = props

  useEffect(() => {
    if (!isAppConfigFetched) {
      fetchAppConfig()
    }
  }, [isAppConfigFetched])

  return (
    <Router>
      <Header />
      <div className='main-container'>
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  )
}

App.propTypes = {
  fetchAppConfig: PropTypes.func,
  isAppConfigFetched: PropTypes.bool,
}

App.defaultProps = {
  fetchAppConfig: noop,
  isAppConfigFetched: false,
}

export default App
