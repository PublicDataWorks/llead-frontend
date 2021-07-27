import { connect } from 'react-redux'

import ForgotPasswordConfirm from 'components/forgot-password-confirm-page'
import { getForgotPasswordConfirmStatus } from 'selectors/forgot-password-confirm-page'
import { performForgotPasswordConfirm } from 'actions/forgot-password-confirm-page'

const mapStateToProps = (state) => ({
  forgotPasswordConfirmStatus: getForgotPasswordConfirmStatus(state),
})

const mapDispatchToProps = {
  performForgotPasswordConfirm,
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordConfirm)
