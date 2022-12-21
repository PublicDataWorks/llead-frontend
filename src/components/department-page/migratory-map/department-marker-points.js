import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layer, Source, Popup } from 'react-mapbox-gl'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import * as turf from '@turf/turf'

import { BASE_CIRCLE_RADIUS } from 'constants/common'

const DepartmentMarkerPoints = (props) => {
  const { department, departmentCoordinates } = props

  const { location } = department

  const [hoveredDepartment, setHoveredDepartment] = useState(null)

  const features = map(departmentCoordinates, (dep) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: dep.coordinates,
    },
    properties: {
      name: dep.name,
    },
  }))

  let geojson = {
    type: 'FeatureCollection',
    features,
  }

  const locationFeatures = turf.featureCollection([turf.point(location)])

  const handlePointMouseEnter = (e) => {
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

  const mapTopLeft = [-97.00968750000014, 33.04426149544631]
  const mapBottomRight = [-82.39787109374994, 28.438406418194234]

  const bounder = turf.envelope(
    turf.featureCollection([turf.point(mapTopLeft), turf.point(mapBottomRight)])
  )

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
        id='department-marker'
        geoJsonSource={{ type: 'geojson', data: locationFeatures }}
      />
      <Layer
        id='department-marker-layer'
        type='symbol'
        sourceId='department-marker'
        layout={{
          'icon-image': 'red-marker',
          'icon-size': 0.5,
          'icon-anchor': 'bottom',
        }}
        before='department-backdrop-layer'
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
        onMouseEnter={handlePointMouseEnter}
        before='department-marker-layer'
      />
      {!isEmpty(hoveredDepartment) && (
        <Popup coordinates={hoveredDepartment.coordinates}>
          {hoveredDepartment.name}
        </Popup>
      )}
    </>
  )
}

DepartmentMarkerPoints.propTypes = {
  departmentCoordinates: PropTypes.array,
  department: PropTypes.object,
}

DepartmentMarkerPoints.defaultProps = {
  departmentCoordinates: [],
  department: {},
}

export default DepartmentMarkerPoints
