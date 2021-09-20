import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './news-article-card.scss'
import OuterLink from 'components/common/links/outer-link'

const NewsArticleCard = (props) => {
  const { title, url, sourceName, className } = props

  return (
    <OuterLink
      href={url}
      className={cx('timeline-news-article-card', className)}
    >
      <div className='news-article-timeline-preview'>
        <div className='news-article-preview' />
      </div>
      <div className='news-article-timeline-content'>
        <div className='news-article-title'>{title}</div>
        <div className='news-article-subtitle'>{sourceName}</div>
      </div>
    </OuterLink>
  )
}

NewsArticleCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  sourceName: PropTypes.string,
  className: PropTypes.string,
}

NewsArticleCard.defaultProps = {
  title: '',
  sourceName: '',
  className: '',
}

export default NewsArticleCard
