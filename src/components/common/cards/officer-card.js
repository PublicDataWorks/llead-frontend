import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'
import noop from 'lodash/noop'

import './officer-card.scss'
import OfficerBadges from 'components/common/items/officer-badges'
import { officerPath } from 'utils/paths'
import CustomLink from '../links/custom-link'
import { RECENT_ITEM_TYPES } from 'constants/common'

const OfficerCard = (props) => {
  const {
    id,
    name,
    badges,
    latestRank,
    department,
    className,
    onItemClick,
    removeRecentItem,
  } = props

  return (
    <CustomLink
      className={cx('officer-card', className)}
      to={officerPath(id, name)}
      onClick={onItemClick}
      removeRecentItem={removeRecentItem}
      removeData={{
        id,
        type: RECENT_ITEM_TYPES.OFFICER,
      }}
    >
      <div className='officer-info'>
        <div className='officer-rank'>{startCase(latestRank)}</div>
        <div className='officer-name'>{startCase(name)}</div>
        <OfficerBadges badges={badges} />
      </div>
      <div className='officer-card-footer'>
        {!isEmpty(department) && !isEmpty(department.id) && (
          <div className='officer-department-name'>{department.name}</div>
        )}
      </div>
    </CustomLink>
  )
}

OfficerCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  badges: PropTypes.array,
  latestRank: PropTypes.string,
  department: PropTypes.object,
  className: PropTypes.string,
  onItemClick: PropTypes.func,
  removeRecentItem: PropTypes.func,
}

OfficerCard.defaultProps = {
  badges: [],
  department: {},
  className: '',
  onItemClick: noop,
}

export default OfficerCard
