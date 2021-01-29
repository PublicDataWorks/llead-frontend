import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'

import Carousel from 'components/common/carousel'
import OfficerCard from 'components/common/cards/officer-card'
import './officers-carousel.scss'

const OfficersCarousel = (props) => {
  const { fetchOfficers, officers } = props

  useEffect(() => {
    fetchOfficers()
  }, [])

  const items = map(officers, (officer) => (
    <OfficerCard key={officer.id} {...officer} />
  ))

  return (
    <Carousel
      className='officers-carousel'
      title='Officers'
      sortedField='most recently added'
      items={items}
    />
  )
}

OfficersCarousel.propTypes = {
  officers: PropTypes.array,
  fetchOfficers: PropTypes.func,
}

OfficersCarousel.defaultProps = {
  officers: [],
  fetchOfficers: noop,
}

export default OfficersCarousel
