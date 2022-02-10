import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './featured-news-aticle-card.scss'
import OuterLink from 'components/common/links/outer-link'
import { formatDate } from 'utils/formatter'

const FeaturedNewsArticleCard = (props) => {
  const { item: newsArticle, className } = props

  const {
    title,
    isStarred,
    url,
    publishedDate,
    sourceDisplayName,
  } = newsArticle

  return (
    <OuterLink
      href={url}
      className={cx('featured-news-article-card', className)}
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
        <div className='news-article-subtitle'>{formatDate(publishedDate)}</div>
        <div className='news-article-subtitle'>{sourceDisplayName}</div>
      </div>
    </OuterLink>
  )
}

FeaturedNewsArticleCard.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
}

FeaturedNewsArticleCard.defaultProps = {
  item: {},
  className: '',
}

export default FeaturedNewsArticleCard
