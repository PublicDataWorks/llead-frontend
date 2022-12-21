import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Source } from 'react-mapbox-gl'
import map from 'lodash/map'

import { BASE_CIRCLE_RADIUS } from 'constants/common'

const DepartmentPoints = (props) => {
  const { departmentCoordinates } = props

  const features = map(departmentCoordinates, (department) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: department.coordinates,
    },
  }))

  let geojson = {
    type: 'FeatureCollection',
    features,
  }

  return (
    <>
      <Source
        id='department-location-data'
        geoJsonSource={{ type: 'geojson', data: geojson }}
      />
      <Layer
        id='department-point-layer'
        type='circle'
        sourceId='department-location-data'
        paint={{
          'circle-radius': BASE_CIRCLE_RADIUS,
          'circle-color': '#231f20',
        }}
      />
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
