import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'
import cx from 'classnames'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import omitBy from 'lodash/omitBy'

import './search-input.scss'
import TaggedInput from 'components/common/inputs/tagged-input'
import { SEARCH_PATH, FRONT_PAGE_PATH } from 'constants/paths'
import SearchSVG from 'assets/icons/search.svg'
import CloseSVG from 'assets/icons/close.svg'
import get from 'lodash.get'

const SearchInput = (props) => {
  const {
    changeSearchQuery,
    searchQuery,
    searchDepartment,
    searchQuerySuggestions,
    changeSearchDepartment,
    fetchSearchQueries,
    fetchDepartment,
    fetchedDepartment,
  } = props
  const history = useHistory()
  const location = useLocation()

  const [showSuggestions, setShowSuggestions] = useState(false)

  const isSearchPage = () => location.pathname.startsWith('/search')

  const performSearch = (newSearchQuery) => {
    changeSearchQuery(newSearchQuery)

    const raw_params = {
      q: newSearchQuery,
      department: get(searchDepartment, 'id', ''),
    }
    const params = omitBy(raw_params, isEmpty)

    const newLocation = {
      pathname: SEARCH_PATH,
      search: newSearchQuery
        ? qs.stringify(params, { addQueryPrefix: true })
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
    history.push(FRONT_PAGE_PATH)
  }

  const onSuggestionClick = (suggestion) => {
    performSearch(suggestion)
    setShowSuggestions(false)
  }

  const onKeyDown = (event) => {
    if (
      event.code == 'Backspace' &&
      isEmpty(searchQuery) &&
      !isEmpty(searchDepartment)
    ) {
      clearSearch()
    }
  }

  useEffect(() => {
    if (isSearchPage()) {
      changeSearchDepartment(fetchedDepartment || {})
      changeSearchQuery(searchQuery || '')
    }
  }, [fetchedDepartment])

  useEffect(() => {
    if (isSearchPage()) {
      performSearch(searchQuery)
    }
  }, [searchDepartment])

  useEffect(() => {
    if (isSearchPage()) {
      const search = qs.parse(location.search, { ignoreQueryPrefix: true })
      const { q, department } = search
      if (department) {
        fetchDepartment(department)
      }
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
          <TaggedInput
            iconSrc={SearchSVG}
            placeholder={
              isEmpty(get(searchDepartment, 'id', ''))
                ? 'Search by name, department, or keyword'
                : 'Search within department'
            }
            onChange={onSearchInputChange}
            value={searchQuery}
            autoFocus={isSearchPage()}
            className='search-input'
            searchTag={get(searchDepartment, 'name', '')}
            onClick={() => setShowSuggestions(true)}
            onKeyDown={onKeyDown}
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
  searchDepartment: PropTypes.object,
  searchQuerySuggestions: PropTypes.array,
  changeSearchQuery: PropTypes.func,
  fetchSearchQueries: PropTypes.func,
  changeSearchDepartment: PropTypes.func,
  fetchDepartment: PropTypes.func,
  fetchedDepartment: PropTypes.object,
}

SearchInput.defaultProps = {
  searchQuerySuggestions: [],
  changeSearchQuery: noop,
  fetchSearchQueries: noop,
  changeSearchDepartment: noop,
  fetchDepartment: noop,
}

export default SearchInput
