import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import './department-card.scss'

const DepartmentCard = (props) => {
  const { name, city, parish, locationMapUrl } = props
  const elementStyles = isEmpty(locationMapUrl)
    ? {}
    : { backgroundImage: `url(${locationMapUrl})` }

  return (
    <div className='department-card'>
      <div className='department-info'>
        <div className='department-type'>Police Department</div>
        <div className='department-name'>{name}</div>
      </div>
      <div className='deparment-card-footer'>
        <div className='deparment-map' style={elementStyles} />
        <div className='deparment-location'>
          <div className='deparment-city'>{city}</div>
          <div className='deparment-parish'>{parish}</div>
        </div>
      </div>
    </div>
  )
}

DepartmentCard.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  parish: PropTypes.string,
  locationMapUrl: PropTypes.string,
}

DepartmentCard.defaultProps = {
  city: '',
  parish: '',
  locationMapUrl: '',
}

export default DepartmentCard
