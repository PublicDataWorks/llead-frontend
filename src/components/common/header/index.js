import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import qs from 'qs'

import './header.scss'
import Input from 'components/common/inputs/input'
import { SEARCH_PATH } from 'constants/paths'
import SearchSVG from 'assets/icons/search.svg'

const Header = (props) => {
  const { isLoggedIn, logOut, changeSearchQuery, searchQuery } = props
  const history = useHistory()
  const location = useLocation()

  const isSearchPage = () => location.pathname.startsWith('/search')

  const handleSearch = (event) => {
    const inputValue = event.target.value
    changeSearchQuery(inputValue)

    const newLocation = {
      pathname: SEARCH_PATH,
      search: inputValue
        ? qs.stringify({ q: inputValue }, { addQueryPrefix: true })
        : '',
    }

    if (isSearchPage()) {
      history.replace(newLocation)
    } else {
      history.push(newLocation)
    }
  }

  useEffect(() => {
    if (isSearchPage()) {
      const search = qs.parse(location.search, { ignoreQueryPrefix: true })
      const { q } = search
      changeSearchQuery(q || '')
    }
  }, [])

  return (
    <div className='header'>
      <div className='logo'>LOGO</div>
      {isLoggedIn && (
        <>
          <div className='search-input-container'>
            <Input
              iconSrc={SearchSVG}
              placeholder='Search by name, department, or keyword'
              onChange={handleSearch}
              value={searchQuery}
              autoFocus={isSearchPage()}
              className='search-input'
            />
          </div>
          <div className='logout-btn' onClick={logOut}>
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
  logOut: PropTypes.func,
  changeSearchQuery: PropTypes.func,
}

Header.defaultProps = {
  isLoggedIn: false,
  logOut: noop,
  changeSearchQuery: noop,
}

export default Header
