import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { LOGIN_PATH } from 'constants/paths'

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) =>
  isLoggedIn ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to={LOGIN_PATH} />
  )

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  isLoggedIn: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  isLoggedIn: false,
}

export default PrivateRoute
