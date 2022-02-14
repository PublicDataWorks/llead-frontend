import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import InfiniteScroll from 'react-infinite-scroller'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import get from 'lodash/get'
import { isMobile } from 'react-device-detect'

import './featured-search.scss'
import FeaturedOfficerCard from 'components/department-page/featured-items/featured-officer-card'
import SearchNewsArticleItem from './search-news-articles-item'
import SearchDocumentItem from './search-documents-item'

const FeaturedSearch = (props) => {
  const {
    departmentId,
    departmentName,
    isSearchModalOpen,
    searchModalOnClose,
    itemType,
    count,
    limit,
    offset,
    searchItems,
    fetchSearchItems,
    clearDepartmentSearchResults,
  } = props

  const componentMapping = {
    officers: {
      Card: FeaturedOfficerCard,
      title: 'officers',
    },
    news_articles: {
      Card: SearchNewsArticleItem,
      title: 'news',
    },
    documents: {
      Card: SearchDocumentItem,
      title: 'documents',
    },
  }

  const { Card, title } = get(componentMapping, itemType, {})

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isSearchModalOpen) {
      fetchSearchItems(departmentId, { q: searchQuery, kind: itemType })
    }
  }, [searchQuery, itemType, departmentId, isSearchModalOpen])

  useEffect(() => {
    clearDepartmentSearchResults()
    setSearchQuery('')
  }, [searchModalOnClose])

  const loadFunc = () => {
    fetchSearchItems(departmentId, {
      q: searchQuery,
      limit,
      offset,
      kind: itemType,
    })
  }

  return (
    <Modal
      isOpen={isSearchModalOpen}
      onRequestClose={searchModalOnClose}
      className='featured-search-modal'
      overlayClassName='featured-search-backdrop'
    >
      <div className='featured-search-header'>
        <div className='search-icon' />
        <div className='stretch-input'>
          <input
            name='searchInput'
            className='transparent-input'
            autoFocus
            placeholder={`Search ${title} in ${departmentName}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='close-icon' onClick={searchModalOnClose} />
      </div>
      {searchQuery && (
        <div className='search-result'>
          <div className='search-result-count'>{`${count} Search results for "${searchQuery}" `}</div>
          <div className='search-result-department'>
            {isMobile ? departmentName : ` | ${departmentName}`}
          </div>
        </div>
      )}

      {!isEmpty(searchItems) && (
        <div className='card-collection'>
          <InfiniteScroll
            hasMore={offset > 0}
            loadMore={loadFunc}
            className='infinity-scroll'
            useWindow={false}
          >
            {map(searchItems, (item) => (
              <Card key={item.id} item={item} />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </Modal>
  )
}

FeaturedSearch.propTypes = {
  searchItems: PropTypes.array,
  departmentId: PropTypes.string,
  departmentName: PropTypes.string,
  isSearchModalOpen: PropTypes.bool,
  searchModalOnClose: PropTypes.func,
  fetchSearchItems: PropTypes.func,
  itemType: PropTypes.string,
  count: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  clearDepartmentSearchResults: PropTypes.func,
}

FeaturedSearch.defaultProps = {
  searchItems: [],
  isSearchModalOpen: false,
  searchModalOnClose: noop,
  fetchSearchItems: noop,
  clearDepartmentSearchResults: noop,
}

export default FeaturedSearch
