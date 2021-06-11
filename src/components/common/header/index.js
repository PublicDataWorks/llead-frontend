import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import noop from 'lodash/noop'

import './header.scss'
import SearchInput from './search-input'
import UserPanel from 'containers/common/header/user-panel'
import { FRONT_PAGE_PATH } from 'constants/paths'

const Header = (props) => {
  const {
    isLoggedIn,
    changeSearchQuery,
    searchQuery,
    searchQuerySuggestions,
  } = props

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
          <UserPanel />
        </>
      )}
    </div>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  searchQuery: PropTypes.string,
  searchQuerySuggestions: PropTypes.array,
  changeSearchQuery: PropTypes.func,
}

Header.defaultProps = {
  isLoggedIn: false,
  searchQuerySuggestions: [],
  changeSearchQuery: noop,
}

export default Header
