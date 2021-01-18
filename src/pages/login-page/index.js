import { connect } from 'react-redux'

import Login from 'components/login-page/login'
import 'styles/base.scss'
import { isLoggedIn } from 'selectors/common'
import { performLogin } from 'actions/login-page'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state),
  }
}

const mapDispatchToProps = {
  performLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
