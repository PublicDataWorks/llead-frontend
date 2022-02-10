import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import './featured-news-aticle-card.scss'
import OuterLink from 'components/common/links/outer-link'
import { RECENT_ITEM_TYPES } from 'constants/common'

const FeaturedNewsArticleCard = (props) => {
  const { item: newsArticle, className, saveRecentItem } = props

  const { id, title, isStarred, url, publishedDate, sourceName } = newsArticle

  const handleClick = () => {
    saveRecentItem({
      type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      id: id,
      data: newsArticle,
    })
  }

  return (
    <OuterLink
      href={url}
      className={cx('featured-news-article-card', className)}
      onClick={handleClick}
    >
      {isStarred && <div className='star-corner' />}
      <div className='news-article-info'>
        <div className='news-article-type'>news article</div>
        <div className='news-article-preview-container'>
          <div className='news-article-preview' />
        </div>
        <div className='news-article-title'>{title}</div>
      </div>
      <div className='news-article-card-footer'>
        <div className='news-article-subtitle'>{publishedDate}</div>
        <div className='news-article-subtitle'>{sourceName}</div>
      </div>
    </OuterLink>
  )
}

FeaturedNewsArticleCard.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
  saveRecentItem: PropTypes.func,
}

FeaturedNewsArticleCard.defaultProps = {
  item: {},
  className: '',
  saveRecentItem: noop,
}

export default FeaturedNewsArticleCard
