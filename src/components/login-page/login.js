import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { useForm } from 'react-hook-form'
import { Redirect, Link } from 'react-router-dom'
import cx from 'classnames'

import Input from 'components/common/inputs/input'
import PasswordInput from 'components/common/inputs/password-input'
import Button from 'components/common/buttons/button'
import EmailSVG from 'assets/icons/email.svg'
import './login.scss'
import { FORGOT_PASSWORD_PATH, FRONT_PAGE_PATH } from 'constants/paths'

const Login = ({
  isLoggedIn,
  isLoginFailed,
  performLogin,
  previousLocation,
}) => {
  const { register, handleSubmit } = useForm()

  if (isLoggedIn) {
    return <Redirect to={previousLocation || FRONT_PAGE_PATH} />
  }

  const onSubmit = (data) => {
    performLogin(data)
  }

  return (
    <div className='login-page unauthorized'>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <Input
          iconSrc={EmailSVG}
          placeholder='email'
          type='text'
          name='email'
          ref={register}
          className={cx('email-input', { error: isLoginFailed })}
        />
        <PasswordInput
          placeholder='password'
          type='password'
          name='password'
          ref={register}
          className={cx('password-input', { error: isLoginFailed })}
        />
        <Button className='submit-btn' type='submit'>
          Sign in
        </Button>
        <div className='forgot-password-message'>
          Forgot your password? Click&nbsp;
          <Link to={FORGOT_PASSWORD_PATH}>here</Link> to reset your password
        </div>
        {isLoginFailed && (
          <div className='error-message'>
            Password/email combination aren’t recognized
          </div>
        )}
      </form>
    </div>
  )
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool,
  isLoginFailed: PropTypes.bool,
  performLogin: PropTypes.func,
  previousLocation: PropTypes.object,
}

Login.defaultProps = {
  isLoggedIn: false,
  isLoginFailed: false,
  performLogin: noop,
}

export default Login
