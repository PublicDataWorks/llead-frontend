import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import DocumentPage from 'pages/document-page'
import HomePage from 'pages/home-page'
import LoginPage from 'pages/login-page'
import { isLoggedIn } from 'selectors/common'
import * as paths from 'constants/paths'
import PrivateRoute from 'components/common/higher-order/private-route'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state),
  }
}

const AppRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route path={paths.LOGIN_PATH} component={LoginPage} />
      <Route path={`${paths.DOCUMENTS_PATH}:id/`} component={DocumentPage} />
      <PrivateRoute
        path={paths.HOME_PATH}
        isLoggedIn={isLoggedIn}
        exact
        component={HomePage}
      />
    </Switch>
  )
}

AppRoutes.propTypes = {
  isLoggedIn: PropTypes.bool,
}

AppRoutes.defaultProps = {
  isLoggedIn: false,
}

export default connect(mapStateToProps)(AppRoutes)
