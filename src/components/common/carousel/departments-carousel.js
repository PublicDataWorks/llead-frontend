import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import Carousel from 'components/common/carousel'
import DepartmentCard from 'components/common/cards/department-card'
import './departments-carousel.scss'

const DepartmentsCarousel = (props) => {
  const { items, sortedField } = props

  const cards = map(items, (department) => (
    <DepartmentCard key={department.id} {...department} />
  ))

  return (
    <Carousel
      className='departments-carousel'
      title='Departments'
      sortedField={sortedField}
      cards={cards}
    />
  )
}

DepartmentsCarousel.propTypes = {
  items: PropTypes.array,
  sortedField: PropTypes.string,
}

DepartmentsCarousel.defaultProps = {
  items: [],
}

export default DepartmentsCarousel
