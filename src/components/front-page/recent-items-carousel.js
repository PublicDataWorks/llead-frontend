import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'

import Carousel from 'components/common/carousel'
import DepartmentCard from 'components/common/cards/department-card'
import OfficerCard from 'components/common/cards/officer-card'
import DocumentCard from 'components/common/cards/document-card'
import { RECENT_ITEM_TYPES } from 'constants/common'
import './recent-items-carousel.scss'

const RECENT_COMPONENTS_MAPPING = {
  [RECENT_ITEM_TYPES.DEPARTMENT]: DepartmentCard,
  [RECENT_ITEM_TYPES.OFFICER]: OfficerCard,
  [RECENT_ITEM_TYPES.DOCUMENT]: DocumentCard,
}

const RecentItemsCarousel = (props) => {
  const { items, className } = props

  const cards = map(items, (item) => {
    const ItemComponent = RECENT_COMPONENTS_MAPPING[item.type]
    return (
      ItemComponent && (
        <ItemComponent key={`${item.type}-${item.id}`} className='swiper-slide' {...item} />
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
  items: PropTypes.array,
  className: PropTypes.string,
}

RecentItemsCarousel.defaultProps = {
  items: [],
  className: '',
}

export default RecentItemsCarousel
