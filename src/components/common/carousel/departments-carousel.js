import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'
import noop from 'lodash/noop'

import Carousel from 'components/common/carousel'
import DepartmentCard from 'components/common/cards/department-card'

const DepartmentsCarousel = (props) => {
  const { items, className, onItemClick } = props

  const cards = map(items, (department) => (
    <DepartmentCard
      key={department.id}
      className='swiper-slide'
      {...department}
      onItemClick={onItemClick}
    />
  ))

  return (
    <Carousel
      className={cx('departments-carousel', className)}
      title='Agencies'
      cards={cards}
    />
  )
}

DepartmentsCarousel.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  onItemClick: PropTypes.func,
}

DepartmentsCarousel.defaultProps = {
  items: [],
  className: '',
  onItemClick: noop,
}

export default DepartmentsCarousel
