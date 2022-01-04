import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import FeaturedCarousel from './featured-carousel'
import './department-section.scss'

const DepartmentSection = (props) => {
  const { items, card: Card, title } = props

  const cardItems = map(items, (item) => <Card key={item.id} item={item} />)

  return (
    <div className='department-section-container'>
      <div className='carousel-title'>{title}</div>
      <FeaturedCarousel title={title} cards={cardItems} />
    </div>
  )
}

DepartmentSection.propTypes = {
  items: PropTypes.array,
  card: PropTypes.func,
  title: PropTypes.string,
}

DepartmentSection.defaultProps = {
  items: [],
}

export default DepartmentSection
