import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import cx from 'classnames'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'

import Input from 'components/common/inputs/input'
import Button from 'components/common/buttons/button'
import LockSVG from 'assets/icons/lock.svg'
import './forgot-password-confirm.scss'
import {
  FORGOT_PASSWORD_CONFIRM_NOT_MATCH_MESSAGE,
  FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE,
} from 'constants/messages'

const ForgotPasswordConfirm = (props) => {
  const { forgotPasswordConfirmStatus, performForgotPasswordConfirm } = props

  const { register, handleSubmit } = useForm()
  const [isValid, setIsValid] = useState(true)

  const location = useLocation()
  const search = qs.parse(location.search, { ignoreQueryPrefix: true })
  const { token } = search

  const onSubmit = (data) => {
    const isMatchPassword = data.password === data.confirmPassword

    setIsValid(isMatchPassword)

    if (isMatchPassword) {
      performForgotPasswordConfirm({ token: token, password: data.password })
    }
  }

  return (
    <div className='forgot-password-confirm-page unauthorized'>
      <form
        className='forgot-password-confirm-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          iconSrc={LockSVG}
          placeholder='Password'
          type='password'
          name='password'
          ref={register}
          className={cx('password-input', {
            error:
              forgotPasswordConfirmStatus &&
              forgotPasswordConfirmStatus !==
                FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE,
          })}
        />

        <Input
          iconSrc={LockSVG}
          placeholder='Confirm password'
          type='password'
          name='confirmPassword'
          ref={register}
          className={cx('password-input', {
            error:
              forgotPasswordConfirmStatus &&
              forgotPasswordConfirmStatus !==
                FORGOT_PASSWORD_CONFIRM_SUCCESS_MESSAGE,
          })}
        />
        <Button className='submit-btn' type='submit'>
          Change Password
        </Button>
        {!isValid && (
          <div className='error-message'>
            {FORGOT_PASSWORD_CONFIRM_NOT_MATCH_MESSAGE}
          </div>
        )}
        {isValid && !isEmpty(forgotPasswordConfirmStatus) && (
          <div className='error-message'>{forgotPasswordConfirmStatus}</div>
        )}
      </form>
    </div>
  )
}

ForgotPasswordConfirm.propTypes = {
  forgotPasswordConfirmStatus: PropTypes.string,
  performForgotPasswordConfirm: PropTypes.func,
}

ForgotPasswordConfirm.defaultProps = {
  forgotPasswordConfirmStatus: '',
  performForgotConfirmPassword: noop,
}

export default ForgotPasswordConfirm
