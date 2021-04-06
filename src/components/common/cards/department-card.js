import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import cx from 'classnames'

import './department-card.scss'
import { departmentPath } from 'utils/paths'
import CustomLink from 'components/common/links/custom-link'

const DepartmentCard = (props) => {
  const { id, name, city, parish, locationMapUrl, className } = props
  const elementStyles = isEmpty(locationMapUrl)
    ? {}
    : { backgroundImage: `url(${locationMapUrl})` }

  return (
    <CustomLink
      to={departmentPath(id)}
      className={cx('department-card', className)}
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
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  parish: PropTypes.string,
  locationMapUrl: PropTypes.string,
  className: PropTypes.string,
}

DepartmentCard.defaultProps = {
  city: '',
  parish: '',
  locationMapUrl: '',
  className: '',
}

export default DepartmentCard
