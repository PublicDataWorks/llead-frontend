import { connect } from 'react-redux'

import Login from 'components/login-page/login'
import { isLoggedInSelector } from 'selectors/common'
import { getIsLoginFailed } from 'selectors/login-page'
import { performLogin } from 'actions/login-page'

const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedInSelector(state),
  isLoginFailed: getIsLoginFailed(state),
})

const mapDispatchToProps = {
  performLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
