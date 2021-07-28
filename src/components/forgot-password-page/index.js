import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { useForm } from 'react-hook-form'
import cx from 'classnames'

import Input from 'components/common/inputs/input'
import Button from 'components/common/buttons/button'
import EmailSVG from 'assets/icons/email.svg'
import './forgot-password.scss'
import { FORGOT_PASSWORD_FAILURE_MESSAGE } from 'constants/messages'

const ForgotPassword = ({ forgotPasswordStatus, performForgotPassword }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    performForgotPassword(data)
  }

  const isErrorMessage =
    forgotPasswordStatus === FORGOT_PASSWORD_FAILURE_MESSAGE

  return (
    <div className='forgot-password-page unauthorized'>
      <form className='forgot-password-form' onSubmit={handleSubmit(onSubmit)}>
        <Input
          iconSrc={EmailSVG}
          placeholder='email'
          type='text'
          name='email'
          ref={register({ required: true })}
          className={cx('email-input', {
            error: isErrorMessage,
          })}
        />
        <Button className='submit-btn' type='submit'>
          Reset Password
        </Button>
        <div className={cx('message', { 'success-message': !isErrorMessage })}>
          {forgotPasswordStatus}
        </div>
      </form>
    </div>
  )
}

ForgotPassword.propTypes = {
  forgotPasswordStatus: PropTypes.string,
  performForgotPassword: PropTypes.func,
}

ForgotPassword.defaultProps = {
  forgotPasswordStatus: '',
  performForgotPassword: noop,
}

export default ForgotPassword
