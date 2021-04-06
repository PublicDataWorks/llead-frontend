import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import noop from 'lodash/noop'

import './header.scss'
import SearchInput from './search-input'
import { FRONT_PAGE_PATH } from 'constants/paths'

const Header = (props) => {
  const {
    isLoggedIn,
    logOut,
    changeSearchQuery,
    searchQuery,
    refreshToken,
    searchQuerySuggestions,
  } = props

  const handleLogout = () => logOut({ refresh: refreshToken })

  return (
    <div className='header'>
      <Link to={FRONT_PAGE_PATH} className='logo'>
        LLEAD
      </Link>
      {isLoggedIn && (
        <>
          <SearchInput
            searchQuerySuggestions={searchQuerySuggestions}
            changeSearchQuery={changeSearchQuery}
            searchQuery={searchQuery}
          />
          <div className='logout-btn' onClick={handleLogout}>
            L
          </div>
        </>
      )}
    </div>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  searchQuery: PropTypes.string,
  refreshToken: PropTypes.string,
  searchQuerySuggestions: PropTypes.array,
  logOut: PropTypes.func,
  changeSearchQuery: PropTypes.func,
}

Header.defaultProps = {
  isLoggedIn: false,
  searchQuerySuggestions: [],
  logOut: noop,
  changeSearchQuery: noop,
}

export default Header
