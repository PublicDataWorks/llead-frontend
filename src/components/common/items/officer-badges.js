import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import cx from 'classnames'

import './officer-badges.scss'
import ArrayWithSeparator from 'components/common/array-with-separator'

const OfficerBadges = (props) => {
  const { badges, isFeaturedOfficer } = props
  let isEllipsis = false
  let allBadges = badges

  if (badges.length > 3) {
    isEllipsis = true
    allBadges = badges.slice(0, 3)
  }

  const officerBadges = map(allBadges, (badge, index) => (
    <span key={index}>{badge}</span>
  ))

  return (
    <div
      className={cx(
        { 'featured-officer-badges': isFeaturedOfficer },
        { 'officer-badges': !isFeaturedOfficer }
      )}
    >
      <ArrayWithSeparator
        items={officerBadges}
        separator=', '
        isEllipsis={isEllipsis}
      />
    </div>
  )
}

OfficerBadges.propTypes = {
  badges: PropTypes.array,
  isFeaturedOfficer: PropTypes.bool,
}

OfficerBadges.defaultProps = {
  badges: [],
  isFeaturedOfficer: false,
}

export default OfficerBadges
