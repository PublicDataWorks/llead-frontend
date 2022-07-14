import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layer, Source, Popup } from 'react-mapbox-gl'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import { BASE_CIRCLE_RADIUS } from 'constants/common'

const DepartmentPoints = (props) => {
  const { departmentCoordinates } = props

  const [hoveredDepartment, setHoveredDepartment] = useState({})

  const features = map(departmentCoordinates, (department) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: department.coordinates,
    },
    properties: {
      name: department.name,
    },
  }))

  let geojson = {
    type: 'FeatureCollection',
    features,
  }

  const handleMouseEnter = (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice()
    const name = e.features[0].properties.name

    setHoveredDepartment({
      coordinates,
      name,
    })
  }

  return (
    <>
      <Source
        id='department-location-data'
        geoJsonSource={{ type: 'geojson', data: geojson }}
      />
      <Layer
        id='department-point-inner-circle-layer'
        type='circle'
        sourceId='department-location-data'
        paint={{
          'circle-radius': BASE_CIRCLE_RADIUS,
          'circle-color': '#231f20',
        }}
        onMouseEnter={handleMouseEnter}
      />
      {!isEmpty(hoveredDepartment) && (
        <Popup coordinates={hoveredDepartment.coordinates}>
          {hoveredDepartment.name}
        </Popup>
      )}
    </>
  )
}

DepartmentPoints.propTypes = {
  departmentCoordinates: PropTypes.array,
}

DepartmentPoints.defaultProps = {
  departmentCoordinates: [],
}

export default DepartmentPoints
