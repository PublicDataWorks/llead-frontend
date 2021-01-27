import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import './header.scss'

const Header = (props) => {
  const { isLoggedIn, logOut } = props

  return (
    <div className='header'>
      {isLoggedIn && (
        <div className='logout-btn' onClick={logOut}>
          L
        </div>
      )}
      <div className='logo'>LOGO</div>
    </div>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
}

Header.defaultProps = {
  isLoggedIn: false,
  logOut: noop,
}

export default Header
