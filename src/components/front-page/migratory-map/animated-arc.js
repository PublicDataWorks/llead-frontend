import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import assignIn from 'lodash/assignIn'
import { Layer, Source } from 'react-mapbox-gl'

import { NUM_OF_POINTS } from 'constants/common'

const AnimatedArc = (props) => {
  const { line, currentIndex, lineIndex } = props

  const [shouldRun, setShouldRun] = useState(false)
  const [firstIndex, setFirstIndex] = useState(0)
  const [secondIndex, setSecondIndex] = useState(0)

  const animatedLineData = assignIn({}, line, {
    geometry: {
      ...line.geometry,
      coordinates: line.geometry.coordinates.slice(firstIndex, secondIndex),
    },
  })

  useEffect(() => {
    if (shouldRun) {
      const timeout = setTimeout(() => {
        const isFormer = secondIndex < NUM_OF_POINTS
        const isLatter = firstIndex < NUM_OF_POINTS

        if (isFormer) {
          setSecondIndex(secondIndex + 20)
        } else if (isLatter) {
          setFirstIndex(firstIndex + 20)
        } else {
          setShouldRun(false)
        }
      }, 20)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [firstIndex, secondIndex, shouldRun])

  useEffect(() => {
    if (lineIndex === currentIndex) {
      setShouldRun(true)
      setFirstIndex(0)
      setSecondIndex(0)
    }
  }, [currentIndex])

  return (
    shouldRun && (
      <>
        <Source
          id={`animated-line-${lineIndex}`}
          geoJsonSource={{ type: 'geojson', data: animatedLineData }}
        />
        <Layer
          id={`animated-layer-${lineIndex}`}
          type='line'
          sourceId={`animated-line-${lineIndex}`}
          layout={{ 'line-cap': 'round', 'line-join': 'round' }}
          paint={{
            'line-color': ['get', 'color'],
            'line-width': ['get', 'count'],
            'line-opacity': 0.7,
          }}
        />
      </>
    )
  )
}

AnimatedArc.propTypes = {
  line: PropTypes.object,
  currentIndex: PropTypes.number,
  lineIndex: PropTypes.number,
}

AnimatedArc.defaultProps = {
  line: {},
}

export function areEqual(prevProps, nextProps) {
  if (
    nextProps.currentIndex === nextProps.lineIndex ||
    nextProps.currentIndex === 0
  ) {
    return false
  }

  return true
}

export default React.memo(AnimatedArc, areEqual)
