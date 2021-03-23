import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import cx from 'classnames'

import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import Input from 'components/common/inputs/input'
import Button from 'components/common/buttons/button'
import EmailSVG from 'assets/icons/email.svg'
import LockSVG from 'assets/icons/lock.svg'
import './login.scss'
import { FRONT_PAGE_PATH } from 'constants/paths'

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
    <>
      <Header />
      <div className='login-page unauthorized'>
        <div className='content-container'>
          <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <Input
              iconSrc={EmailSVG}
              placeholder='email'
              type='text'
              name='email'
              ref={register}
              className={cx('email-input', { error: isLoginFailed })}
            />
            <Input
              iconSrc={LockSVG}
              placeholder='password'
              type='password'
              name='password'
              ref={register}
              className={cx('password-input', { error: isLoginFailed })}
            />
            <Button className='submit-btn' type='submit'>Sign in</Button>
            {isLoginFailed && (
              <div className='error-message'>
                Password/email combination aren’t recognized
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
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
