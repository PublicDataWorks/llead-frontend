import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import map from 'lodash/map'

import Carousel from 'components/common/carousel'
import NewsArticleCard from 'components/common/cards/news-article-card'

const NewsArticlesCarousel = (props) => {
  const { items, sortedField, className } = props

  const cards = map(items, (news_article) => (
    <NewsArticleCard
      key={news_article.id}
      className='swiper-slide'
      {...news_article}
    />
  ))

  return (
    <Carousel
      className={cx('news-articles-carousel', className)}
      title='News'
      sortedField={sortedField}
      cards={cards}
    />
  )
}

NewsArticlesCarousel.propTypes = {
  items: PropTypes.array,
  sortedField: PropTypes.string,
  className: PropTypes.string,
}

NewsArticlesCarousel.defaultProps = {
  items: [],
  className: '',
}

export default NewsArticlesCarousel
