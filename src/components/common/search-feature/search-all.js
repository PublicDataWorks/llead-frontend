import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import noop from 'lodash/noop'

import './search-all.scss'
import DepartmentItem from 'components/common/items/department-item'
import DocumentItem from 'components/common/items/document-item'
import NewsArticleItem from 'components/common/items/news-article-item'
import OfficerItem from 'components/common/items/officer-item'
import { SHOW_MORE_LIMIT } from 'constants/common'

const SearchAll = (props) => {
  const {
    searchAllResults,
    searchQuery,
    saveRecentItem,
    onItemClick,
    switchSection,
  } = props

  const componentMapping = {
    departments: DepartmentItem,
    officers: OfficerItem,
    documents: DocumentItem,
    articles: NewsArticleItem,
  }

  const allResults = omitBy(searchAllResults, isUndefined)

  const mappedComponent = (item, docType) => {
    const Component = componentMapping[docType]

    return (
      <Component
        key={docType + item.id}
        {...item}
        saveRecentItem={saveRecentItem}
        onItemClick={onItemClick}
      />
    )
  }

  const showMore = (docType) => {
    switchSection(docType)
  }

  return (
    <div className='search-all'>
      {map(
        allResults,
        ({ results, count }, docType) =>
          count > 0 && (
            <div key={docType} className='search-result'>
              <div className='search-title'>
                <span className='search-count'>{count}</span> results for&nbsp;
                <span className='search-string'>
                  &ldquo;{searchQuery}&rdquo;
                </span>
                &nbsp;in&nbsp;
                <span className='search-section'>{docType}</span>
              </div>
              {map(results.slice(0, SHOW_MORE_LIMIT), (item) =>
                mappedComponent(item, docType)
              )}
              {count > SHOW_MORE_LIMIT && (
                <div className='search-more' onClick={() => showMore(docType)}>
                  + {count - SHOW_MORE_LIMIT} more
                </div>
              )}
            </div>
          )
      )}
    </div>
  )
}

SearchAll.propTypes = {
  searchAllResults: PropTypes.object,
  searchQuery: PropTypes.string,
  saveRecentItem: PropTypes.func,
  onItemClick: PropTypes.func,
  switchSection: PropTypes.func,
}

SearchAll.defaultProps = {
  searchAllResults: {},
  searchQuery: '',
  saveRecentItem: noop,
  onItemClick: noop,
  switchSection: noop,
}

export default SearchAll
