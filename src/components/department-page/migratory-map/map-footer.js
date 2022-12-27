import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import './map-footer.scss'

const MapFooter = (props) => {
  const { department } = props
  const { city, address, phone, parish } = department

  return (
    <div className='department-location'>
      <div className='upper-location-info'>
        {!isEmpty(city) && <div className='department-city'>{city}</div>}
        {!isEmpty(parish) && <div className='department-parish'>{parish}</div>}
      </div>

      <div className='lower-location-info'>
        {!isEmpty(address) && (
          <div className='department-address'>{address}</div>
        )}
        {!isEmpty(phone) && <div className='department-phone'>{phone}</div>}
      </div>
    </div>
  )
}

MapFooter.propTypes = {
  department: PropTypes.object,
}

MapFooter.defaultProps = {
  department: {},
}

export default MapFooter
