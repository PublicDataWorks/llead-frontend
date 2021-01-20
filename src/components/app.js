import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import AppRoutes from 'routes'

const App = (props) => {
  const { fetchAppConfig, isAppConfigFetched } = props

  useEffect(() => {
    if (!isAppConfigFetched) {
      fetchAppConfig()
    }
  }, [isAppConfigFetched])

  return (
    <Router>
      <AppRoutes />
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
