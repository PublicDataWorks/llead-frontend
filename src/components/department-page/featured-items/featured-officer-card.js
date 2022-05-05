import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import startCase from 'lodash/startCase'

import './featured-officer-card.scss'
import OfficerBadges from 'components/common/items/officer-badges'
import { officerPath } from 'utils/paths'
import CustomLink from 'components/common/links/custom-link'
import pluralize from 'pluralize'

const FeaturedOfficerCard = (props) => {
  const { item: officer, className } = props

  const {
    id,
    name,
    isStarred,
    badges,
    complaintsCount,
    useOfForcesCount,
    latestRank,
  } = officer

  return (
    <CustomLink
      className={cx('featured-officer-card', className)}
      to={officerPath(id, name)}
    >
      {isStarred && <div className='star-corner'></div>}
      <div className='officer-info'>
        <div className='officer-rank'>{startCase(latestRank)}</div>
        <div className='officer-name'>{startCase(name)}</div>
        <OfficerBadges badges={badges} isFeaturedOfficer={true} />
      </div>
      <div className='officer-card-footer'>
        <div className='allegation-row'>
          {complaintsCount > 0 ? (
            <span className='allegation-count'>{complaintsCount}</span>
          ) : (
            <span>--</span>
          )}

          <span className={cx({ label: complaintsCount > 0 })}>
            {pluralize(' Allegation', complaintsCount)}
          </span>
        </div>
        <div>
          {useOfForcesCount > 0 ? (
            <span className='use-of-force-count'>{useOfForcesCount}</span>
          ) : (
            <span>--</span>
          )}

          <span className={cx({ label: useOfForcesCount > 0 })}>
            {pluralize(' Use', useOfForcesCount) + ' of force'}
          </span>
        </div>
      </div>
    </CustomLink>
  )
}

FeaturedOfficerCard.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
}

FeaturedOfficerCard.defaultProps = {
  item: {},
  className: '',
}

export default FeaturedOfficerCard
