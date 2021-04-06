import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import noop from 'lodash/noop'
import throttle from 'lodash/throttle'

import './search-page.scss'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'
import OfficersCarousel from 'components/common/carousel/officers-carousel'
import DocumentsList from 'components/search-page/search-results/documents-list'
import { SEARCH_THROTTLE_TIME_OUT } from 'constants/common'

const SearchPage = (props) => {
  const { searchResults, searchQuery, search, saveRecentItem } = props
  const { departments, officers, documents } = searchResults

  const searchResultsComponents = [
    { key: 'departments', items: departments, component: DepartmentsCarousel },
    { key: 'officers', items: officers, component: OfficersCarousel },
    { key: 'documents', items: documents, component: DocumentsList },
  ]

  const performSearch = useCallback(
    throttle((query) => {
      search(query)
    }, SEARCH_THROTTLE_TIME_OUT),
    [search]
  )

  useEffect(() => {
    if (!isEmpty(searchQuery)) {
      performSearch(searchQuery)
    }
  }, [searchQuery])

  return (
    <div className='search-page'>
      {map(
        searchResultsComponents,
        ({ component: Component, key, items }) =>
          !isEmpty(items) && (
            <Component
              items={items}
              key={key}
              className='search-results'
              saveRecentItem={saveRecentItem}
              highlighting
            />
          )
      )}
    </div>
  )
}

SearchPage.propTypes = {
  searchResults: PropTypes.object,
  searchQuery: PropTypes.string,
  search: PropTypes.func,
  saveRecentItem: PropTypes.func,
}

SearchPage.defaultProps = {
  searchResults: {},
  search: noop,
  saveRecentItem: noop,
}

export default SearchPage
