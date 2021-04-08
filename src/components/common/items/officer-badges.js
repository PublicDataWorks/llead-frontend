import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'

import './officer-badges.scss'
import ArrayWithSeparator from 'components/common/array-with-separator'

const OfficerBadges = (props) => {
  const { badges } = props

  const officerBadges = map(badges, (badge, index) => (
    <span key={index}>{badge}</span>
  ))

  return (
    <div className='officer-badges'>
      <ArrayWithSeparator items={officerBadges} separator=',' />
    </div>
  )
}

OfficerBadges.propTypes = {
  badges: PropTypes.array,
}

export default OfficerBadges
