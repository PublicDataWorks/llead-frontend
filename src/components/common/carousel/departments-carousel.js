import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'

import Carousel from 'components/common/carousel'
import DepartmentCard from 'components/common/cards/department-card'

const DepartmentsCarousel = (props) => {
  const { items, sortedField, className } = props

  const cards = map(items, (department) => (
    <DepartmentCard
      key={department.id}
      className='swiper-slide'
      {...department}
    />
  ))

  return (
    <Carousel
      className={cx('departments-carousel', className)}
      title='Departments'
      sortedField={sortedField}
      cards={cards}
    />
  )
}

DepartmentsCarousel.propTypes = {
  items: PropTypes.array,
  sortedField: PropTypes.string,
  className: PropTypes.string,
}

DepartmentsCarousel.defaultProps = {
  items: [],
  className: '',
}

export default DepartmentsCarousel
