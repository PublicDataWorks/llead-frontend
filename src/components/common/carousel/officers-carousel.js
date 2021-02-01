import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import Carousel from 'components/common/carousel'
import OfficerCard from 'components/common/cards/officer-card'
import './officers-carousel.scss'

const OfficersCarousel = (props) => {
  const { items, sortedField } = props

  const cards = map(items, (officer) => (
    <OfficerCard key={officer.id} {...officer} />
  ))

  return (
    <Carousel
      className='officers-carousel'
      title='Officers'
      sortedField={sortedField}
      cards={cards}
    />
  )
}

OfficersCarousel.propTypes = {
  items: PropTypes.array,
  sortedField: PropTypes.string,
}

OfficersCarousel.defaultProps = {
  items: [],
}

export default OfficersCarousel
