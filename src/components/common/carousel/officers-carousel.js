import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'
import noop from 'lodash/noop'

import Carousel from 'components/common/carousel'
import OfficerCard from 'components/common/cards/officer-card'

const OfficersCarousel = (props) => {
  const { items, className, onItemClick } = props

  const cards = map(items, (officer) => (
    <OfficerCard
      key={officer.id}
      className='swiper-slide'
      {...officer}
      onItemClick={onItemClick}
    />
  ))

  return (
    <Carousel
      className={cx('officers-carousel', className)}
      title='Officers'
      cards={cards}
    />
  )
}

OfficersCarousel.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  onItemClick: PropTypes.func,
}

OfficersCarousel.defaultProps = {
  items: [],
  className: '',
  onItemClick: noop,
}

export default OfficersCarousel
