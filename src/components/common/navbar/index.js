import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'

import './navbar.scss'
import { ABOUT_PATH, CONTACT_PATH, FINDINGS_PAGE } from 'constants/paths'

const Navbar = () => {
  const location = useLocation()

  return (
    <div className='navbar'>
      <Link
        to={ABOUT_PATH}
        className={cx('page', {
          'is-active': location.pathname === ABOUT_PATH,
        })}
      >
        About
      </Link>
      <Link
        to={CONTACT_PATH}
        className={cx('page', {
          'is-active': location.pathname === CONTACT_PATH,
        })}
      >
        Contact
      </Link>
      <a className='page' href={FINDINGS_PAGE}>
        Findings
      </a>
    </div>
  )
}

export default Navbar
