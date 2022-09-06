import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Source } from 'react-mapbox-gl'
import { MAP_LINE_COLOR } from 'constants/common'

const FixedArc = (props) => {
  const { lines, currentIndex } = props

  const lineFeatures = lines.slice(0, currentIndex + 1)

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
          'line-color': MAP_LINE_COLOR,
          'line-width': ['get', 'count'],
          'line-opacity': 0.2,
        }}
      />
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
