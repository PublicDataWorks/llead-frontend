import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Source } from 'react-mapbox-gl'
import { length, along } from '@turf/turf'

const FixedArc = (props) => {
  const { lines, currentIndex } = props

  const lineFeatures = lines.slice(0, currentIndex + 1)

  const line = lines[currentIndex]

  const officerData = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: along(line, length(line) / 2).geometry.coordinates,
    },
    properties: {
      officerName: currentIndex < 5 ? line.properties.officerName : '',
    },
  }

  const stableLineData = {
    type: 'FeatureCollection',
    features: lineFeatures,
  }

  return (
    <>
      <Source
        id='stable-lines'
        geoJsonSource={{ type: 'geojson', data: stableLineData }}
      />
      <Layer
        id='stable-layer'
        type='line'
        sourceId={`stable-lines`}
        layout={{ 'line-cap': 'round', 'line-join': 'round' }}
        paint={{
          'line-color': '#005ef4',
          'line-width': ['get', 'count'],
          'line-opacity': 0.2,
        }}
      />
      {currentIndex < 5 && (
        <Source
          id='officer-name'
          geoJsonSource={{ type: 'geojson', data: officerData }}
        />
      )}

      {currentIndex < 5 && (
        <Layer
          id='officer-layer'
          type='symbol'
          sourceId='officer-name'
          layout={{
            'symbol-placement': 'point',
            'text-anchor': 'center',
            'text-field': '{officerName}',
            'text-size': 14,
          }}
        />
      )}
    </>
  )
}

FixedArc.propTypes = {
  lines: PropTypes.array,
  currentIndex: PropTypes.number,
}

FixedArc.defaultProps = {
  lines: [],
  currentIndex: 0,
}

export default FixedArc
