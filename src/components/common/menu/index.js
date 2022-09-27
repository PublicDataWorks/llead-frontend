import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import './menu.scss'
import { ABOUT_PATH, CONTACT_PATH } from 'constants/paths'

const Menu = (props) => {
  const { closeMenu } = props

  return (
    <div className='menu'>
      <div className='close-btn' onClick={closeMenu} />
      <Link to={ABOUT_PATH} className='about'>
        About
      </Link>
      <Link to={CONTACT_PATH} className='contact'>
        Contact
      </Link>
    </div>
  )
}

Menu.propTypes = {
  closeMenu: PropTypes.func,
}

Menu.defaultProps = {
  closeMenu: noop,
}

export default Menu
