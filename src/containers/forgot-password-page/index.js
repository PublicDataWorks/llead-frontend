import { connect } from 'react-redux'

import ForgotPassword from 'components/forgot-password-page'
import { getForgotPasswordStatus } from 'selectors/forgot-password-page'
import { performForgotPassword } from 'actions/forgot-password-page'

const mapStateToProps = (state) => ({
  forgotPasswordStatus: getForgotPasswordStatus(state),
})

const mapDispatchToProps = {
  performForgotPassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
