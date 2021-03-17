import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation, Link } from 'react-router-dom'
import qs from 'qs'
import cx from 'classnames'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './header.scss'
import Input from 'components/common/inputs/input'
import { SEARCH_PATH, FRONT_PAGE_PATH } from 'constants/paths'
import SearchSVG from 'assets/icons/search.svg'
import CloseSVG from 'assets/icons/close.svg'

const Header = (props) => {
  const {
    isLoggedIn,
    logOut,
    changeSearchQuery,
    searchQuery,
    refreshToken,
  } = props
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

  const clearSearch = () => {
    changeSearchQuery('')
    history.push(FRONT_PAGE_PATH)
  }

  const handleLogout = () => logOut({ refresh: refreshToken })

  useEffect(() => {
    if (isSearchPage()) {
      const search = qs.parse(location.search, { ignoreQueryPrefix: true })
      const { q } = search
      changeSearchQuery(q || '')
    }
  }, [])

  return (
    <div className='header'>
      <Link to={FRONT_PAGE_PATH} className='logo'>
        LLEAD
      </Link>
      {isLoggedIn && (
        <>
          <div
            className={cx('search-input-container', {
              'has-value': !isEmpty(searchQuery),
            })}
          >
            <Input
              iconSrc={SearchSVG}
              placeholder='Search by name, department, or keyword'
              onChange={handleSearch}
              value={searchQuery}
              autoFocus={isSearchPage()}
              className='search-input'
            />
            <img
              className='close-btn'
              src={CloseSVG}
              onClick={clearSearch}
              data-testid='test--close-btn'
            />
          </div>
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
  logOut: PropTypes.func,
  changeSearchQuery: PropTypes.func,
}

Header.defaultProps = {
  isLoggedIn: false,
  logOut: noop,
  changeSearchQuery: noop,
}

export default Header
