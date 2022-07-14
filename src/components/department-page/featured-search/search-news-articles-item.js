import React from 'react'
import PropTypes from 'prop-types'
import { sanitize } from 'dompurify'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'

import './search-news-articles-item.scss'
import OuterLink from 'components/common/links/outer-link'
import { EVENT_TYPES, NEWS_TYPE, RECENT_ITEM_TYPES } from 'constants/common'
import { analyzeAction } from 'utils/google-analytics'

const SearchNewsArticleItem = (props) => {
  const { item: newsArticle, saveRecentItem } = props

  const {
    id,
    sourceName,
    title,
    publishedDate,
    content,
    url,
    author,
    contentHighlight,
    authorHighlight,
  } = newsArticle

  const authorStr = authorHighlight ? `by ${authorHighlight}` : `by ${author}`
  const contentStr = !isEmpty(contentHighlight)
    ? `...${contentHighlight}...`
    : `${content}`

  const santinizedHTML = sanitize(`${authorStr}  ${contentStr}`)

  const handleClick = () => {
    saveRecentItem({
      type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      id: id,
      data: newsArticle,
    })
    analyzeAction({
      type: EVENT_TYPES.OPEN_ARTICLE,
      data: { article_id: id },
    })
  }

  return (
    <OuterLink
      className='search-news-article-item'
      href={url}
      onClick={handleClick}
    >
      <div className='news-article-item-title'>
        <div className='news-article-item-type'>{NEWS_TYPE}</div>
        <div className='news-article-item-name'>{title}</div>
        <div className='news-article-item-source-name'>{sourceName}</div>
      </div>
      <div className='news-article-item-subtitle'>
        {publishedDate && (
          <div className='news-article-item-published-date'>
            {publishedDate}
          </div>
        )}
        <div
          className='news-article-item-text-content'
          dangerouslySetInnerHTML={{
            __html: santinizedHTML,
          }}
        />
      </div>
    </OuterLink>
  )
}

SearchNewsArticleItem.propTypes = {
  item: PropTypes.object,
  saveRecentItem: PropTypes.func,
}

SearchNewsArticleItem.defaultProps = {
  item: {},
  saveRecentItem: noop,
}

export default SearchNewsArticleItem
