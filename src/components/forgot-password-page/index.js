import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { useForm } from 'react-hook-form'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'

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

  return (
    <div className='forgot-password-page unauthorized'>
      <form className='forgot-password-form' onSubmit={handleSubmit(onSubmit)}>
        <Input
          iconSrc={EmailSVG}
          placeholder='email'
          type='text'
          name='email'
          ref={register}
          className={cx('email-input', {
            error: forgotPasswordStatus === FORGOT_PASSWORD_FAILURE_MESSAGE,
          })}
        />
        <Button className='submit-btn' type='submit'>
          Reset Password
        </Button>
        {!isEmpty(forgotPasswordStatus) && (
          <div className='error-message'>{forgotPasswordStatus}</div>
        )}
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
