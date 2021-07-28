import React, { forwardRef, useState } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import './password-input.scss'
import LockSVG from 'assets/icons/lock.svg'

const PasswordInput = forwardRef(({ className, ...rest }, ref) => {
  const [hidePassword, setHidePassword] = useState(true)

  const toggleHidePassword = () => setHidePassword(!hidePassword)

  return (
    <div className={cx('password-input-container', className)}>
      <img className='svg-icon' src={LockSVG} />
      <input
        className='input-field has-icon has-right-icon'
        ref={ref}
        {...rest}
        type={hidePassword ? 'password' : 'text'}
      />
      <div
        className={cx('eye-icon', { hide: hidePassword })}
        onClick={toggleHidePassword}
      />
    </div>
  )
})

PasswordInput.propTypes = {
  className: PropTypes.string,
}

PasswordInput.defaultProps = {
  className: '',
}

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
