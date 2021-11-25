import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import './officer-departments.scss'
import ArrayWithSeparator from 'components/common/array-with-separator'
import CustomLink from 'components/common/links/custom-link'
import { departmentPath } from 'utils/paths'

const OfficerDepartments = (props) => {
  const { departments } = props

  const officerDepartments = map(departments, (department) => (
    <CustomLink
      className='officer-department'
      to={departmentPath(department.id)}
      key={department.id}
    >
      {department.name}
    </CustomLink>
  ))

  return (
    <div className='officer-departments'>
      <ArrayWithSeparator items={officerDepartments} separator={', '} />
    </div>
  )
}

OfficerDepartments.propTypes = {
  departments: PropTypes.array,
}

export default OfficerDepartments
