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

  const isComplaintsCount = complaintsCount > 0
  const isUseOfForcesCount = useOfForcesCount > 0
  const isFooterShow = isComplaintsCount || isUseOfForcesCount

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
      {isFooterShow && (
        <div className='officer-card-footer'>
          {isComplaintsCount && (
            <div className='allegation-row'>
              <span className='allegation-count'>{complaintsCount}</span>
              <span>{pluralize(' Allegation', complaintsCount)}</span>
            </div>
          )}
          {isUseOfForcesCount && (
            <div className='use-of-force-row'>
              <span className='use-of-force-count'>{useOfForcesCount}</span>
              <span>{pluralize(' Use', useOfForcesCount) + ' of force'}</span>
            </div>
          )}
        </div>
      )}
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
