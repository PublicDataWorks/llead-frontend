import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'

import './navbar.scss'
import { ABOUT_PATH, CONTACT_PATH } from 'constants/paths'

const Navbar = () => {
  const location = useLocation()

  return (
    <div className='navbar'>
      <Link
        to={ABOUT_PATH}
        className={cx('about', {
          'is-active': location.pathname === ABOUT_PATH,
        })}
      >
        About
      </Link>
      <Link
        to={CONTACT_PATH}
        className={cx('contact', {
          'is-active': location.pathname === CONTACT_PATH,
        })}
      >
        Contact
      </Link>
    </div>
  )
}

export default Navbar
