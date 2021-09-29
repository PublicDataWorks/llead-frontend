import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'

import Carousel from 'components/common/carousel'
import NewsArticleCard from 'components/common/cards/news-article-card'

const NewsArticlesCarousel = (props) => {
  const { items, sortedField, className, saveRecentItem } = props

  const cards = map(items, (news_article) => (
    <NewsArticleCard
      key={news_article.id}
      className='swiper-slide'
      {...news_article}
      recentData={{
        ...news_article,
        date: news_article.publishedDate,
      }}
      saveRecentItem={saveRecentItem}
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
  saveRecentItem: PropTypes.func,
}

NewsArticlesCarousel.defaultProps = {
  items: [],
  className: '',
  saveRecentItem: noop,
}

export default NewsArticlesCarousel
