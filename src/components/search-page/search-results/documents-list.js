import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import qs from 'qs'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './documents-list.scss'
import DocumentItem from 'components/common/items/document-item'
import Button from 'components/common/buttons/button'
import { DOCUMENTS_SHOW_MORE_LIMIT } from 'constants/common'
import { SEARCH_PATH } from 'constants/paths'

const DocumentsList = (props) => {
  const {
    items,
    highlighting,
    className,
    saveRecentItem,
    onItemClick,
    params,
    docType,
    performSearch,
    changeSearchQuery,
    searchQuery,
  } = props

  const { limit, offset, count, q } = params

  const history = useHistory()

  const canShowMore = isEmpty(docType) && count > DOCUMENTS_SHOW_MORE_LIMIT

  let itemsList = map(items, (document) => (
    <DocumentItem
      key={document.id}
      {...document}
      highlighting={highlighting}
      saveRecentItem={saveRecentItem}
      onItemClick={onItemClick}
    />
  ))

  itemsList = itemsList.slice(
    0,
    canShowMore ? DOCUMENTS_SHOW_MORE_LIMIT : itemsList.length
  )

  const loadFunc = () => {
    performSearch({
      query: q,
      limit,
      offset,
      docType,
    })
  }

  const showMore = () => {
    const newSearchQuery = `document: ${searchQuery}`
    changeSearchQuery(newSearchQuery)

    const newLocation = {
      pathname: SEARCH_PATH,
      search: newSearchQuery
        ? qs.stringify({ q: newSearchQuery }, { addQueryPrefix: true })
        : '',
    }

    history.replace(newLocation)
  }

  return (
    <div className={cx('documents-list', className)}>
      <div className='documents-list-title'>Documents</div>
      <div className='list-items'>
        <InfiniteScroll
          hasMore={!isEmpty(docType) && offset > 0}
          loadMore={loadFunc}
        >
          {itemsList}
        </InfiniteScroll>
      </div>
      {canShowMore && (
        <Button className='documents-search-more' onClick={showMore}>
          Show more
        </Button>
      )}
    </div>
  )
}

DocumentsList.propTypes = {
  searchQuery: PropTypes.string,
  params: PropTypes.object,
  items: PropTypes.array,
  highlighting: PropTypes.bool,
  className: PropTypes.string,
  saveRecentItem: PropTypes.func,
  performSearch: PropTypes.func,
  changeSearchQuery: PropTypes.func,
  onItemClick: PropTypes.func,
  docType: PropTypes.string,
}

DocumentsList.defaultProps = {
  searchQuery: '',
  params: {},
  items: [],
  saveRecentItem: noop,
  onItemClick: noop,
  performSearch: noop,
  changeSearchQuery: noop,
}

export default DocumentsList
