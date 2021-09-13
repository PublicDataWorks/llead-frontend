import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './news-article-card.scss'
import OuterLink from 'components/common/links/outer-link'

const NewsArticleCard = (props) => {
  const { title, url, publishedDate, sourceName, className } = props

  return (
    <OuterLink href={url} className={cx('news-article-card', className)}>
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
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  publishedDate: PropTypes.string,
  sourceName: PropTypes.string,
  className: PropTypes.string,
}

NewsArticleCard.defaultProps = {
  title: '',
  url: '',
  publishedDate: '',
  sourceName: '',
  className: '',
}

export default NewsArticleCard
