import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import noop from 'lodash/noop'

import DepartmentPage from 'pages/department-page'
import OfficerPage from 'pages/officer-page'
import FrontPage from 'pages/front-page'
import LoginPage from 'pages/login-page'
import SearchPage from 'pages/search-page'
import { isLoggedInSelector } from 'selectors/common'
import * as paths from 'constants/paths'
import PrivateRoute from 'components/common/higher-order/private-route'
import { setPreviousLocation } from 'actions/common/private-route'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedInSelector(state),
  }
}

const mapDispatchToProps = {
  setPreviousLocation,
}

const AppRoutes = ({ isLoggedIn, setPreviousLocation }) => {
  const privateRouteAttributes = {
    isLoggedIn,
    setPreviousLocation,
  }

  return (
    <Switch>
      <Route path={paths.LOGIN_PATH} component={LoginPage} />
      <PrivateRoute
        {...privateRouteAttributes}
        path={paths.FRONT_PAGE_PATH}
        exact
        component={FrontPage}
      />
      <PrivateRoute
        {...privateRouteAttributes}
        path={paths.SEARCH_PATH}
        exact
        component={SearchPage}
      />
      <PrivateRoute
        {...privateRouteAttributes}
        path={`${paths.DEPARTMENTS_PATH}:id/`}
        component={DepartmentPage}
        exact
      />
      <PrivateRoute
        {...privateRouteAttributes}
        path={`${paths.OFFICERS_PATH}:id/`}
        component={OfficerPage}
        exact
      />
    </Switch>
  )
}

AppRoutes.propTypes = {
  isLoggedIn: PropTypes.bool,
  setPreviousLocation: PropTypes.func,
}

AppRoutes.defaultProps = {
  isLoggedIn: false,
  setPreviousLocation: noop,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes)
