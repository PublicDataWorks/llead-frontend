import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import noop from 'lodash/noop'

import DepartmentPageContainer from 'containers/department-page'
import OfficerPageContainer from 'containers/officer-page'
import FrontPageContainer from 'containers/front-page'
import LoginPageContainer from 'containers/login-page'
import SearchPageContainer from 'containers/search-page'
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
      <Route path={paths.LOGIN_PATH} component={LoginPageContainer} />
      <PrivateRoute
        {...privateRouteAttributes}
        path={paths.FRONT_PAGE_PATH}
        exact
        component={FrontPageContainer}
      />
      <PrivateRoute
        {...privateRouteAttributes}
        path={paths.SEARCH_PATH}
        exact
        component={SearchPageContainer}
      />
      <PrivateRoute
        {...privateRouteAttributes}
        path={`${paths.DEPARTMENTS_PATH}:id/`}
        component={DepartmentPageContainer}
        exact
      />
      <PrivateRoute
        {...privateRouteAttributes}
        path={`${paths.OFFICERS_PATH}:id/`}
        component={OfficerPageContainer}
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
