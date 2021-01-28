import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'

import Carousel from 'components/common/carousel'
import DepartmentCard from 'components/common/cards/department-card'
import './departments-carousel.scss'

const DepartmentsCarousel = (props) => {
  const { fetchDepartments, departments } = props

  useEffect(() => {
    fetchDepartments()
  }, [])

  const items = map(departments, (department) => (
    <DepartmentCard key={department.id} {...department} />
  ))

  return (
    <Carousel
      className='departments-carousel'
      title='Departments'
      sortedField='size'
      items={items}
    />
  )
}

DepartmentsCarousel.propTypes = {
  departments: PropTypes.array,
  fetchDepartments: PropTypes.func,
}

DepartmentsCarousel.defaultProps = {
  departments: [],
  fetchDepartments: noop,
}

export default DepartmentsCarousel
