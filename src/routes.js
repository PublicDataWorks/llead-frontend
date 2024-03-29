import React, { Suspense, lazy, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import noop from 'lodash/noop'

const DepartmentPageContainer = lazy(() => import('containers/department-page'))
const OfficerPageContainer = lazy(() => import('containers/officer-page'))
const FrontPageContainer = lazy(() => import('containers/front-page'))
const LoginPageContainer = lazy(() => import('containers/login-page'))
const ForgotPasswordPageContainer = lazy(() =>
  import('containers/forgot-password-page')
)
const ForgotPasswordConfirmPageContainer = lazy(() =>
  import('containers/forgot-password-confirm-page')
)
const AboutPageContainer = lazy(() => import('containers/about-page'))
const ContactPageContainer = lazy(() => import('containers/contact-page'))

import { isLoggedInSelector } from 'selectors/common'
import * as paths from 'constants/paths'
import { setPreviousLocation } from 'actions/common/private-route'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { analyzeAction } from 'utils/google-analytics'
import { EVENT_TYPES } from 'constants/common'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedInSelector(state),
  }
}

const mapDispatchToProps = {
  setPreviousLocation,
}

const AppRoutes = () => {
  const location = useLocation()

  useEffect(() => {
    analyzeAction({
      type: EVENT_TYPES.ACCESS_PAGE,
      data: { page: location.pathname },
    })
  }, [location.pathname])

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route path={paths.LOGIN_PATH} component={LoginPageContainer} exact />
        <Route
          path={paths.FORGOT_PASSWORD_PATH}
          component={ForgotPasswordPageContainer}
          exact
        />
        <Route
          path={paths.FORGOT_PASSWORD_CONFIRM_PATH}
          component={ForgotPasswordConfirmPageContainer}
          exacts
        />
        <Route
          path={paths.FRONT_PAGE_PATH}
          exact
          component={FrontPageContainer}
        />
        <Route
          path={`${paths.DEPARTMENTS_PATH}:id/`}
          component={DepartmentPageContainer}
          exact
        />
        <Route
          path={[
            `${paths.OFFICERS_PATH}:id/`,
            `${paths.OFFICERS_PATH}:id/:officerName`,
          ]}
          component={OfficerPageContainer}
          exact
        />
        <Route path={paths.ABOUT_PATH} exact component={AboutPageContainer} />
        <Route
          path={paths.CONTACT_PATH}
          exact
          component={ContactPageContainer}
        />
      </Switch>
    </Suspense>
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
