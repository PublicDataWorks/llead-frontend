import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import DocumentPage from 'pages/document-page'
import DepartmentPage from 'pages/department-page'
import FrontPage from 'pages/front-page'
import LoginPage from 'pages/login-page'
import SearchPage from 'pages/search-page'
import { isLoggedInSelector } from 'selectors/common'
import * as paths from 'constants/paths'
import PrivateRoute from 'components/common/higher-order/private-route'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedInSelector(state),
  }
}

const AppRoutes = ({ isLoggedIn }) => {
  return (
    <Switch>
      <Route path={paths.LOGIN_PATH} component={LoginPage} />
      <Route path={`${paths.DOCUMENTS_PATH}:id/`} component={DocumentPage} />
      <PrivateRoute
        path={paths.FRONT_PAGE_PATH}
        isLoggedIn={isLoggedIn}
        exact
        component={FrontPage}
      />
      <PrivateRoute
        path={paths.SEARCH_PATH}
        isLoggedIn={isLoggedIn}
        exact
        component={SearchPage}
      />
      <PrivateRoute
        path={`${paths.DEPARTMENTS_PATH}:id/`}
        component={DepartmentPage}
        isLoggedIn={isLoggedIn}
        exact
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
