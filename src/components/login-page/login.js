import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import Header from 'components/common/header'
import Footer from 'components/common/footer'
import Input from 'components/common/inputs/input'
import Button from 'components/common/buttons/button'
import EmailSVG from 'assets/icons/email.svg'
import LockSVG from 'assets/icons/lock.svg'
import './login.scss'
import { FRONT_PAGE_PATH } from 'constants/paths'

const Login = ({ isLoggedIn, performLogin }) => {
  const { register, handleSubmit } = useForm()

  if (isLoggedIn) {
    return <Redirect to={FRONT_PAGE_PATH} />
  }

  const onSubmit = (data) => {
    performLogin(data)
  }

  return (
    <>
      <Header />
      <div className='login-page'>
        <div className='content-container'>
          <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <Input
              iconSrc={EmailSVG}
              placeholder='email'
              type='text'
              name='email'
              ref={register}
              className='email-input'
            />
            <Input
              iconSrc={LockSVG}
              placeholder='password'
              type='password'
              name='password'
              ref={register}
              className='password-input'
            />
            <Button type='submit'>Sign in</Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool,
  performLogin: PropTypes.func,
}

Login.defaultProps = {
  isLoggedIn: false,
  performLogin: noop,
}

export default Login
