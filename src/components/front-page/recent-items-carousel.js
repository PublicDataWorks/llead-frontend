import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'
import noop from 'lodash/noop'

import Carousel from 'components/common/carousel'
import DepartmentCard from 'components/common/cards/department-card'
import OfficerCard from 'components/common/cards/officer-card'
import DocumentCard from 'components/common/cards/document-card'
import { RECENT_ITEM_TYPES } from 'constants/common'
import './recent-items-carousel.scss'
import NewsArticleCard from 'components/common/cards/news-article-card'

const RECENT_COMPONENTS_MAPPING = {
  [RECENT_ITEM_TYPES.DEPARTMENT]: DepartmentCard,
  [RECENT_ITEM_TYPES.OFFICER]: OfficerCard,
  [RECENT_ITEM_TYPES.DOCUMENT]: DocumentCard,
  [RECENT_ITEM_TYPES.NEWS_ARTICLE]: NewsArticleCard,
}

const RecentItemsCarousel = (props) => {
  const {
    isLoggedIn,
    items,
    saveRecentItem,
    removeRecentItem,
    className,
  } = props

  const cards = map(items, (item) => {
    const ItemComponent = RECENT_COMPONENTS_MAPPING[item.type]

    return (
      ItemComponent && (
        <ItemComponent
          key={`${item.type}-${item.id}`}
          isLoggedIn={isLoggedIn}
          className='swiper-slide'
          saveRecentItem={saveRecentItem}
          removeRecentItem={removeRecentItem}
          recentData={{ ...item, date: item.publishedDate }}
          {...item}
        />
      )
    )
  })

  return (
    <Carousel
      className={cx('recent-items-carousel', className)}
      title='Recent activity'
      cards={cards}
    />
  )
}

RecentItemsCarousel.propTypes = {
  isLoggedIn: PropTypes.bool,
  items: PropTypes.array,
  saveRecentItem: PropTypes.func,
  removeRecentItem: PropTypes.func,
  className: PropTypes.string,
}

RecentItemsCarousel.defaultProps = {
  items: [],
  saveRecentItem: noop,
  className: '',
}

export default RecentItemsCarousel
