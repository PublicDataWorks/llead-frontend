import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'
import cx from 'classnames'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './search-input.scss'
import Input from 'components/common/inputs/input'
import { SEARCH_PATH, FRONT_PAGE_PATH } from 'constants/paths'
import SearchSVG from 'assets/icons/search.svg'
import CloseSVG from 'assets/icons/close.svg'

const SearchInput = (props) => {
  const {
    changeSearchQuery,
    searchQuery,
    searchQuerySuggestions,
    fetchSearchQueries,
  } = props
  const history = useHistory()
  const location = useLocation()

  const [showSuggestions, setShowSuggestions] = useState(false)

  const isSearchPage = () => location.pathname.startsWith('/search')

  const performSearch = (newSearchQuery) => {
    changeSearchQuery(newSearchQuery)

    const newLocation = {
      pathname: SEARCH_PATH,
      search: newSearchQuery
        ? qs.stringify({ q: newSearchQuery }, { addQueryPrefix: true })
        : '',
    }

    if (isSearchPage()) {
      history.replace(newLocation)
    } else {
      history.push(newLocation)
    }
  }

  const onSearchInputChange = (event) => {
    performSearch(event.target.value)
  }

  const clearSearch = () => {
    changeSearchQuery('')
    history.push(FRONT_PAGE_PATH)
  }

  const onSuggestionClick = (suggestion) => {
    performSearch(suggestion)
    setShowSuggestions(false)
  }

  useEffect(() => {
    if (isSearchPage()) {
      const search = qs.parse(location.search, { ignoreQueryPrefix: true })
      const { q } = search
      changeSearchQuery(q || '')
    }

    fetchSearchQueries()
  }, [])

  return (
    <>
      <div
        className={cx('search-input-container', {
          'has-value': !isEmpty(searchQuery),
        })}
      >
        <div className='search-input-with-suggestions'>
          <Input
            iconSrc={SearchSVG}
            placeholder='Search by name, department, or keyword'
            onChange={onSearchInputChange}
            value={searchQuery}
            autoFocus={isSearchPage()}
            className='search-input'
            onClick={() => setShowSuggestions(true)}
          />
          <div
            className={cx('search-query-suggestions', {
              'show-suggestion':
                showSuggestions && !isEmpty(searchQuerySuggestions),
            })}
          >
            <div className='search-query-suggestion-header'>
              Recent searches
            </div>
            {searchQuerySuggestions.map((suggestion) => (
              <div
                key={suggestion}
                className='search-query-suggestion'
                onClick={() => onSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
        <img
          className='close-btn'
          src={CloseSVG}
          onClick={clearSearch}
          data-testid='test--close-btn'
        />
      </div>
      {showSuggestions && (
        <div
          className='search-suggestion-overlay'
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </>
  )
}

SearchInput.propTypes = {
  searchQuery: PropTypes.string,
  searchQuerySuggestions: PropTypes.array,
  changeSearchQuery: PropTypes.func,
  fetchSearchQueries: PropTypes.func,
}

SearchInput.defaultProps = {
  searchQuerySuggestions: [],
  changeSearchQuery: noop,
  fetchSearchQueries: noop,
}

export default SearchInput
