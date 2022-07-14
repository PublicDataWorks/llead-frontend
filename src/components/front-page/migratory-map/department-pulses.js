import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Layer, Source } from 'react-mapbox-gl'
import map from 'lodash/map'

import {
  BASE_CIRCLE_RADIUS,
  MAXIMUM_PULSING_RATIO,
  PULSING_STEP,
  RADIUS_THRESHOLD_RATIO,
} from 'constants/common'

const DepartmentPulses = (props) => {
  const { pulsingPoints, currentIndex } = props

  const [pulsingRatio, setPulsingRatio] = useState(1)

  const currentPoints = pulsingPoints[currentIndex]

  const pointData = useMemo(() => {
    const pointFeatures = map(currentPoints, (point) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: point.location,
        },
        properties: {
          radius: point.count * RADIUS_THRESHOLD_RATIO + BASE_CIRCLE_RADIUS,
        },
      }
    })

    return {
      type: 'FeatureCollection',
      features: pointFeatures,
    }
  }, [currentPoints])

  useEffect(() => {
    if (pulsingRatio <= MAXIMUM_PULSING_RATIO) {
      const timeout = setTimeout(() => {
        setPulsingRatio(pulsingRatio * PULSING_STEP)
      }, 500)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [pulsingRatio])

  return (
    <>
      <Source
        id={`dot-point`}
        geoJsonSource={{
          type: 'geojson',
          data: pointData,
        }}
      />
      <Layer
        id={`layer-with-pulsing-dot`}
        type='circle'
        sourceId={`dot-point`}
        paint={{
          'circle-color': '#fc8b24',
          'circle-opacity': 0.8,
          'circle-radius': ['*', ['get', 'radius'], pulsingRatio],
        }}
      />
    </>
  )
}

DepartmentPulses.propTypes = {
  pulsingPoints: PropTypes.array,
  currentIndex: PropTypes.number,
}

DepartmentPulses.defaultProps = {
  pulsingPoints: [],
  currentIndex: 0,
}

export default DepartmentPulses
