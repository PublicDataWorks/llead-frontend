import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'

import Carousel from 'components/common/carousel'
import NewsArticleCard from 'components/common/cards/news-article-card'

const NewsArticlesCarousel = (props) => {
  const { items, sortedField, className, saveRecentItem, isAdmin, hideNewsArticle } = props

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
      hidable={isAdmin}
      hideNewsArticle={hideNewsArticle}
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
  isAdmin: PropTypes.bool,
  items: PropTypes.array,
  sortedField: PropTypes.string,
  className: PropTypes.string,
  saveRecentItem: PropTypes.func,
  hideNewsArticle: PropTypes.func,
}

NewsArticlesCarousel.defaultProps = {
  isAdmin: false,
  items: [],
  className: '',
  saveRecentItem: noop,
  hideNewsArticle: noop,
}

export default NewsArticlesCarousel
