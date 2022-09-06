import React from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import map from 'lodash/map'

import './particular-search.scss'
import DepartmentItem from 'components/common/items/department-item'
import DocumentItem from 'components/common/items/document-item'
import NewsArticleItem from 'components/common/items/news-article-item'
import OfficerItem from 'components/common/items/officer-item'

const ParticularSearch = (props) => {
  const {
    count,
    limit,
    docType,
    offset,
    results,
    searchQuery,
    performSearch,
    saveRecentItem,
    onItemClick,
    department,
    isSearching,
  } = props

  const componentMapping = {
    departments: DepartmentItem,
    officers: OfficerItem,
    documents: DocumentItem,
    articles: NewsArticleItem,
  }

  const loadFunc = () => {
    if (!isSearching) {
      const searchParams = omitBy(
        {
          query: searchQuery,
          limit,
          offset,
          docType,
          department: department.id,
        },
        isNil
      )
      performSearch(searchParams)
    }
  }

  const Component = componentMapping[docType]
  return (
    <div className='particular-search'>
      {!isEmpty(searchQuery) && count > 0 && (
        <div className='search-title'>
          <span className='search-count'>{count}</span> results for&nbsp;
          <span className='search-string'>&ldquo;{searchQuery}&rdquo;</span>
          &nbsp;in&nbsp;
          <span className='search-section'>{docType}</span>
        </div>
      )}

      <InfiniteScroll hasMore={!!offset} loadMore={loadFunc} useWindow={false}>
        {map(results, (item) => (
          <Component
            {...item}
            key={item.id}
            saveRecentItem={saveRecentItem}
            onItemClick={onItemClick}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

ParticularSearch.propTypes = {
  isSearching: PropTypes.bool,
  count: PropTypes.number,
  limit: PropTypes.number,
  docType: PropTypes.string,
  offset: PropTypes.number,
  results: PropTypes.array,
  searchQuery: PropTypes.string,
  performSearch: PropTypes.func,
  saveRecentItem: PropTypes.func,
  onItemClick: PropTypes.func,
  department: PropTypes.object,
}

ParticularSearch.defaultProps = {
  results: [],
  searchQuery: '',
  performSearch: noop,
  saveRecentItem: noop,
  onItemClick: noop,
}

export default ParticularSearch
