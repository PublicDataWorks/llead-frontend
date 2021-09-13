import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'

import './news-article-card.scss'
import OuterLink from 'components/common/links/outer-link'
import { RECENT_ITEM_TYPES } from 'constants/common'

const NewsArticleCard = (props) => {
  const {
    id,
    title,
    url,
    publishedDate,
    sourceName,
    saveRecentItem,
    className,
    recentData,
  } = props

  const handleClick = () => {
    saveRecentItem({
      type: RECENT_ITEM_TYPES.NEWS_ARTICLE,
      id: id,
      data: recentData,
    })
  }

  return (
    <OuterLink
      href={url}
      className={cx('news-article-card', className)}
      onClick={handleClick}
    >
      <div className='news-article-info'>
        <div className='news-article-type'>news article</div>
        <div className='news-article-preview-container'>
          <div className='news-article-preview' />
        </div>
        <div className='news-article-title'>{title}</div>
      </div>
      <div className='news-article-card-footer'>
        <div className='news-article-subtitle'>{sourceName}</div>
        <div className='news-article-subtitle'>{publishedDate}</div>
      </div>
    </OuterLink>
  )
}

NewsArticleCard.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  publishedDate: PropTypes.string,
  sourceName: PropTypes.string,
  saveRecentItem: PropTypes.func,
  className: PropTypes.string,
  recentData: PropTypes.object,
}

NewsArticleCard.defaultProps = {
  title: '',
  url: '',
  publishedDate: '',
  sourceName: '',
  saveRecentItem: noop,
  className: '',
  recentData: {},
}

export default NewsArticleCard
