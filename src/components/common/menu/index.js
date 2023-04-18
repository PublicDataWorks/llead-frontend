import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import './menu.scss'
import { ABOUT_PATH, CONTACT_PATH, FINDINGS_PAGE } from 'constants/paths'

const Menu = (props) => {
  const { closeMenu } = props

  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuRef])

  return (
    <div className='menu' ref={menuRef}>
      <div className='wrapper' onClick={closeMenu}>
        <div className='close-btn' />
        <Link to={ABOUT_PATH} className='page'>
          About
        </Link>
        <Link to={CONTACT_PATH} className='page'>
          Contact
        </Link>
        <a className='page' href={FINDINGS_PAGE}>
          Findings
        </a>
      </div>
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
