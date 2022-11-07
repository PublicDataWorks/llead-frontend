import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import './search-input.scss'
import Input from 'components/common/inputs/input'
import SearchSVG from 'assets/icons/search.svg'
import { isMobile } from 'react-device-detect'

const SearchInput = (props) => {
  const {
    sectionType,
    changeSearchQuery,
    searchQuery,
    searchDepartment,
    searchQuerySuggestions,
    fetchSearchQueries,
    searchModalOnClose,
  } = props
  const [showSuggestions, setShowSuggestions] = useState(false)

  const placeholderContent = useMemo(() => {
    if (isMobile) {
      return 'Search LLEAD'
    }
    return isEmpty(searchDepartment)
      ? 'Search by name, agency, or keyword'
      : `Search ${sectionType} in ${get(searchDepartment, 'name')}`
  }, [(sectionType, searchDepartment)])

  const performSearch = (newSearchQuery) => {
    changeSearchQuery(newSearchQuery)
  }

  const onSearchInputChange = (event) => {
    performSearch(event.target.value)
  }

  const clearSearch = () => {
    changeSearchQuery('')
  }

  const onSuggestionClick = (suggestion) => {
    performSearch(suggestion)
    setShowSuggestions(false)
  }

  useEffect(() => {
    changeSearchQuery('')
    fetchSearchQueries()
  }, [])

  return (
    <div className='search-input-wrapper'>
      <div
        className={cx(
          'search-input-container',
          { 'has-value': !isEmpty(searchQuery) },
          {
            'show-suggestion':
              showSuggestions && !isEmpty(searchQuerySuggestions),
          }
        )}
      >
        <div className='search-input-with-suggestions'>
          <Input
            iconSrc={SearchSVG}
            placeholder={placeholderContent}
            onChange={onSearchInputChange}
            value={searchQuery}
            autoFocus
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
        <div className='clear-btn' onClick={clearSearch}>
          Clear
        </div>
        <div className='close-btn-container'>
          <div
            className='close-btn'
            onClick={searchModalOnClose}
            data-testid='test--close-btn'
          />
        </div>
      </div>
      {showSuggestions && (
        <div
          className='search-suggestion-overlay'
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}

SearchInput.propTypes = {
  sectionType: PropTypes.string,
  searchQuery: PropTypes.string,
  searchDepartment: PropTypes.object,
  searchQuerySuggestions: PropTypes.array,
  changeSearchQuery: PropTypes.func,
  fetchSearchQueries: PropTypes.func,
  searchModalOnClose: PropTypes.func,
}

SearchInput.defaultProps = {
  searchQuerySuggestions: [],
  changeSearchQuery: noop,
  fetchSearchQueries: noop,
  searchModalOnClose: noop,
}

export default SearchInput
