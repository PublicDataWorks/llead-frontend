import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import qs from 'qs'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import './news-articles-list.scss'
import NewsArticleItem from 'components/common/items/news-article-item'
import Button from 'components/common/buttons/button'
import { NEWS_ARTICLES_SHOW_MORE_LIMIT } from 'constants/common'
import { SEARCH_PATH } from 'constants/paths'

const NewsArticlesList = (props) => {
  const {
    items,
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

  const canShowMore = isEmpty(docType) && count > NEWS_ARTICLES_SHOW_MORE_LIMIT

  let itemsList = map(items, (newsArticle) => (
    <NewsArticleItem
      key={newsArticle.id}
      {...newsArticle}
      recentData={newsArticle}
      saveRecentItem={saveRecentItem}
      onItemClick={onItemClick}
    />
  ))

  itemsList = itemsList.slice(
    0,
    canShowMore ? NEWS_ARTICLES_SHOW_MORE_LIMIT : itemsList.length
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
    const newSearchQuery = `article: ${searchQuery}`
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
    <div className={cx('news-articles-list', className)}>
      <div className='news-articles-list-title'>News Articles</div>
      <div className='list-items'>
        <InfiniteScroll
          hasMore={!isEmpty(docType) && offset > 0}
          loadMore={loadFunc}
        >
          {itemsList}
        </InfiniteScroll>
      </div>
      {canShowMore && (
        <Button className='news-articles-search-more' onClick={showMore}>
          Show more
        </Button>
      )}
    </div>
  )
}

NewsArticlesList.propTypes = {
  searchQuery: PropTypes.string,
  params: PropTypes.object,
  items: PropTypes.array,
  className: PropTypes.string,
  saveRecentItem: PropTypes.func,
  performSearch: PropTypes.func,
  changeSearchQuery: PropTypes.func,
  onItemClick: PropTypes.func,
  docType: PropTypes.string,
}

NewsArticlesList.defaultProps = {
  searchQuery: '',
  params: {},
  items: [],
  saveRecentItem: noop,
  onItemClick: noop,
  performSearch: noop,
  changeSearchQuery: noop,
}

export default NewsArticlesList
