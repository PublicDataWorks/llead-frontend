import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import noop from 'lodash/noop'
import throttle from 'lodash/throttle'
import get from 'lodash/get'

import './search-page.scss'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'
import OfficersCarousel from 'components/common/carousel/officers-carousel'
import DocumentsListContainer from 'containers/search-page/documents-list'
import {
  EVENT_TYPES,
  QUERY_DOCTYPE_MAPPING,
  SEARCH_THROTTLE_TIME_OUT,
} from 'constants/common'
import { analyzeAction } from 'utils/google-analytics'

const SearchPage = (props) => {
  const {
    searchResults,
    searchQuery,
    search,
    saveRecentItem,
    saveSearchQuery,
    searchParams,
  } = props
  const { departments, officers, documents } = searchResults
  const { docType, searchString } = searchParams

  const searchResultsComponents = [
    {
      key: 'departments',
      items: departments.results,
      component: DepartmentsCarousel,
    },
    { key: 'officers', items: officers.results, component: OfficersCarousel },
    {
      key: 'documents',
      items: documents.results,
      component: DocumentsListContainer,
      params: {
        limit: documents.limit,
        offset: documents.offset,
        count: documents.count,
        q: searchString,
      },
    },
  ]

  const docTypeMapping = get(QUERY_DOCTYPE_MAPPING, docType)

  const performSearch = useCallback(
    throttle((query) => {
      search(query)
    }, SEARCH_THROTTLE_TIME_OUT),
    [search]
  )

  useEffect(() => {
    if (!isEmpty(searchQuery)) {
      performSearch({
        query: searchString,
        docType: docTypeMapping,
      })
    }
  }, [searchQuery])

  const handleItemClick = () => {
    analyzeAction({
      type: EVENT_TYPES.SEARCH,
      data: { search_query: searchQuery },
    })
    saveSearchQuery(searchQuery)
  }

  return (
    <div className='search-page'>
      {map(
        searchResultsComponents,
        ({ component: Component, key, items, params }) =>
          !isEmpty(items) && (
            <Component
              items={items}
              key={key}
              className='search-results'
              onItemClick={handleItemClick}
              saveRecentItem={saveRecentItem}
              highlighting
              params={params}
              docType={docTypeMapping}
              performSearch={performSearch}
            />
          )
      )}
    </div>
  )
}

SearchPage.propTypes = {
  searchResults: PropTypes.object,
  searchParams: PropTypes.object,
  searchQuery: PropTypes.string,
  search: PropTypes.func,
  saveRecentItem: PropTypes.func,
  saveSearchQuery: PropTypes.func,
}

SearchPage.defaultProps = {
  searchResults: {},
  searchParams: {},
  search: noop,
  saveRecentItem: noop,
  saveSearchQuery: noop,
}

export default SearchPage
