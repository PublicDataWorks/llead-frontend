import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import cx from 'classnames'
import noop from 'lodash/noop'

import './department-card.scss'
import { departmentPath } from 'utils/paths'
import CustomLink from 'components/common/links/custom-link'
import { RECENT_ITEM_TYPES } from 'constants/common'

const DepartmentCard = (props) => {
  const {
    id,
    name,
    city,
    parish,
    locationMapUrl,
    className,
    onItemClick,
    removeRecentItem,
  } = props
  const elementStyles = isEmpty(locationMapUrl)
    ? {}
    : { backgroundImage: `url(${locationMapUrl})` }

  return (
    <CustomLink
      to={departmentPath(id)}
      className={cx('department-card', className)}
      onClick={onItemClick}
      removeRecentItem={removeRecentItem}
      removeData={{
        id,
        type: RECENT_ITEM_TYPES.DEPARTMENT,
      }}
    >
      <div className='department-info'>
        <div className='department-type'>Police Department</div>
        <div className='department-name'>{name}</div>
      </div>
      <div className='department-card-footer'>
        <div className='department-map' style={elementStyles} />
        <div className='department-location'>
          <div className='department-city'>{city}</div>
          <div className='department-parish'>{parish}</div>
        </div>
      </div>
    </CustomLink>
  )
}

DepartmentCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  parish: PropTypes.string,
  locationMapUrl: PropTypes.string,
  className: PropTypes.string,
  onItemClick: PropTypes.func,
  removeRecentItem: PropTypes.func,
}

DepartmentCard.defaultProps = {
  city: '',
  parish: '',
  locationMapUrl: '',
  className: '',
  onItemClick: noop,
}

export default DepartmentCard
