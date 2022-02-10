import React from 'react'
import PropTypes from 'prop-types'
import { sanitize } from 'dompurify'
import isEmpty from 'lodash/isEmpty'

import './search-news-articles-item.scss'
import OuterLink from 'components/common/links/outer-link'
import { EVENT_TYPES, NEWS_TYPE } from 'constants/common'
import { analyzeAction } from 'utils/google-analytics'

const SearchNewsArticleItem = (props) => {
  const { item: newsArticle } = props

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
}

SearchNewsArticleItem.defaultProps = {
  item: {},
}

export default SearchNewsArticleItem
