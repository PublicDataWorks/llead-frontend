import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'

import Carousel from 'components/common/carousel'
import OfficerCard from 'components/common/cards/officer-card'
import './officers-carousel.scss'

const OfficersCarousel = (props) => {
  const { items, sortedField, className } = props

  const cards = map(items, (officer) => (
    <OfficerCard key={officer.id} {...officer} />
  ))

  return (
    <Carousel
      className={ cx('officers-carousel', className) }
      title='Officers'
      sortedField={sortedField}
      cards={cards}
    />
  )
}

OfficersCarousel.propTypes = {
  items: PropTypes.array,
  sortedField: PropTypes.string,
  className: PropTypes.string,
}

OfficersCarousel.defaultProps = {
  items: [],
  className: '',
}

export default OfficersCarousel
