import React, { useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import throttle from 'lodash/throttle'
import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'

import './search-feature.scss'
import SearchBar from 'components/common/search-feature/search-bar'
import SearchInputContainer from 'containers/common/header/search-input'
import SearchAllContainer from 'containers/common/search-feature/search-all'
import ParticularSearchContainer from 'containers/common/search-feature/particular-search'
import { EVENT_TYPES, SEARCH_THROTTLE_TIME_OUT } from 'constants/common'
import { analyzeAction } from 'utils/google-analytics'

const SearchFeature = (props) => {
  const {
    itemType,
    isSearchModalOpen,
    department,
    searchQuery,
    searchModalOnClose,
    search,
    searchAll,
    searchCount,
    saveRecentItem,
    saveSearchQuery,
    flushSearch,
  } = props
  const isDepartmentSearch = !isEmpty(department)

  const [sectionType, setSectionType] = useState(
    isDepartmentSearch ? itemType : 'all'
  )

  useEffect(() => {
    setSectionType(itemType)
  }, [itemType])

  const performSearch = useCallback(
    throttle((query) => {
      search(query)
    }, SEARCH_THROTTLE_TIME_OUT),
    [search]
  )

  const performSearchAll = useCallback(
    throttle((query) => {
      searchAll(query)
    }, SEARCH_THROTTLE_TIME_OUT),
    [searchAll]
  )

  const searchParticularType = () => {
    const searchParams = omitBy(
      {
        query: searchQuery,
        docType: sectionType,
        department: department.id,
      },
      isNil
    )
    performSearch(searchParams)
  }

  useEffect(() => {
    if (!isEmpty(searchQuery)) {
      if (sectionType !== 'all') {
        searchParticularType()
      }
    }
  }, [sectionType])

  useEffect(() => {
    if (!isEmpty(searchQuery)) {
      if (sectionType !== 'all') {
        searchParticularType()
      }
      performSearchAll(
        omitBy({ query: searchQuery, department: department.id }, isNil)
      )
    }
  }, [searchQuery])

  const handleItemClick = () => {
    analyzeAction({
      type: EVENT_TYPES.SEARCH,
      data: { search_query: searchQuery },
    })
    saveSearchQuery(searchQuery)
    searchModalOnClose()
  }

  const switchSection = (section) => {
    setSectionType(section)
  }

  const handleCloseSearch = () => {
    searchModalOnClose()
    setTimeout(flushSearch, 500)
    setSectionType(isDepartmentSearch ? itemType : 'all')
  }

  return (
    <Modal
      closeTimeoutMS={150}
      isOpen={isSearchModalOpen}
      onRequestClose={handleCloseSearch}
      className='search-modal'
      overlayClassName='featured-search-backdrop'
    >
      <SearchInputContainer
        sectionType={sectionType}
        searchModalOnClose={handleCloseSearch}
        searchDepartment={department}
      />
      {!isEmpty(searchQuery) && (
        <div>
          <SearchBar
            sectionType={sectionType}
            resultCount={searchCount}
            switchSection={switchSection}
            isDepartmentSearch={isDepartmentSearch}
          />
          {sectionType === 'all' ? (
            <SearchAllContainer
              searchQuery={searchQuery}
              saveRecentItem={saveRecentItem}
              onItemClick={handleItemClick}
              switchSection={switchSection}
            />
          ) : (
            <ParticularSearchContainer
              searchQuery={searchQuery}
              performSearch={performSearch}
              saveRecentItem={saveRecentItem}
              onItemClick={handleItemClick}
              department={department}
            />
          )}
        </div>
      )}
    </Modal>
  )
}

SearchFeature.propTypes = {
  itemType: PropTypes.string,
  isSearchModalOpen: PropTypes.bool,
  department: PropTypes.object,
  searchModalOnClose: PropTypes.func,
  searchCount: PropTypes.object,
  searchQuery: PropTypes.string,
  search: PropTypes.func,
  searchAll: PropTypes.func,
  saveRecentItem: PropTypes.func,
  saveSearchQuery: PropTypes.func,
  flushSearch: PropTypes.func,
}

SearchFeature.defaultProps = {
  itemType: 'all',
  sectionType: '',
  isSearchModalOpen: false,
  department: {},
  searchModalOnClose: noop,
  search: noop,
  searchAll: noop,
  saveRecentItem: noop,
  saveSearchQuery: noop,
  flushSearch: noop,
}

export function areSearchFeatureEqual(prevProps, nextProps) {
  if (
    nextProps.isSearchModalOpen === false &&
    prevProps.isSearchModalOpen === false
  ) {
    return true
  }

  return false
}

export default React.memo(SearchFeature, areSearchFeatureEqual)
