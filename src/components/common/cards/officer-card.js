import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'

import './officer-card.scss'
import ArrayWithSeparator from 'components/common/array-with-separator'
import { departmentPath } from 'utils/paths'

const OfficerCard = (props) => {
  const { name, badges, department } = props

  const items = badges.map((badge) => <span key={badge}>{badge}</span>)

  return (
    <div className='officer-card'>
      <div className='officer-info'>
        <div className='officer-type'>Police Officer</div>
        <div className='officer-name h1'>{startCase(name)}</div>
        <div className='officer-badges'>
          <ArrayWithSeparator items={items} separator=',' />
        </div>
      </div>
      <div className='officer-card-footer'>
        {!isEmpty(department) && (
          <Link
            to={departmentPath(department.id)}
            className='officer-department-name'
          >
            {department.name}
          </Link>
        )}
      </div>
    </div>
  )
}

OfficerCard.propTypes = {
  name: PropTypes.string.isRequired,
  badges: PropTypes.array,
  department: PropTypes.object,
}

OfficerCard.defaultProps = {
  badges: [],
  department: {},
}

export default OfficerCard
