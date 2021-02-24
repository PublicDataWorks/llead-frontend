import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import noop from 'lodash/noop'
import pick from 'lodash/pick'

import { LOGIN_PATH } from 'constants/paths'

const PrivateRoute = ({ component: Component, isLoggedIn, setPreviousLocation, ...rest }) => {
  if (isLoggedIn) {
    return <Route component={Component} {...rest} />
  } else {
    const location = useLocation()
    const previousLocation = pick(location, 'pathname', 'search')
    setPreviousLocation(previousLocation)
    return <Redirect to={LOGIN_PATH}/>
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  isLoggedIn: PropTypes.bool,
  setPreviousLocation: PropTypes.func,
}

PrivateRoute.defaultProps = {
  isLoggedIn: false,
  setPreviousLocation: noop,
}

export default PrivateRoute
