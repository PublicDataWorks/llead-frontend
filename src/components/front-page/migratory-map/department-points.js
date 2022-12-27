import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layer, Source, Popup } from 'react-mapbox-gl'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import * as turf from '@turf/turf'

import { BASE_CIRCLE_RADIUS } from 'constants/common'

const DepartmentPoints = (props) => {
  const mapTopLeft = [-97.00968750000014, 33.04426149544631]
  const mapBottomRight = [-82.39787109374994, 28.438406418194234]

  const { departmentCoordinates } = props

  const [hoveredDepartment, setHoveredDepartment] = useState(null)

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

  const geojson = {
    type: 'FeatureCollection',
    features,
  }

  const bounder = turf.envelope(
    turf.featureCollection([turf.point(mapTopLeft), turf.point(mapBottomRight)])
  )

  const handleMouseEnter = (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice()
    const name = e.features[0].properties.name

    setHoveredDepartment({
      coordinates,
      name,
    })
  }

  const handlePointMouseExit = () => {
    if (hoveredDepartment) {
      setHoveredDepartment(null)
    }
  }

  return (
    <>
      <Source
        id='department-backdrop'
        geoJsonSource={{ type: 'geojson', data: bounder }}
      />
      <Layer
        id='department-backdrop-layer'
        type='fill'
        sourceId='department-backdrop'
        paint={{
          'fill-color': '#ffffff',
          'fill-opacity': 0,
        }}
        onMouseEnter={handlePointMouseExit}
      />
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
