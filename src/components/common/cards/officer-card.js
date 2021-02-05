import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'

import './officer-card.scss'

const OfficerCard = (props) => {
  const { name, badges, department } = props

  const badgesArray = reduce(
    badges.map((badge, index) => <span key={index}>{badge}</span>),
    (acc, element) => [acc, ', ', element]
  )

  return (
    <div className='officer-card'>
      <div className='officer-info'>
        <div className='officer-type'>Police Officer</div>
        <div className='officer-name'>{name}</div>
        <div className='officer-badges'>{badgesArray}</div>
      </div>
      <div className='officer-card-footer'>
        {!isEmpty(department) && (
          <div className='officer-department-name'>{department.name}</div>
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
