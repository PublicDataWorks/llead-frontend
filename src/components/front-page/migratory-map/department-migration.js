import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import {
  bezierSpline,
  lineString,
  distance,
  destination,
  bearing,
} from '@turf/turf'

import {
  FAST_PATTERN_VELOCITY,
  RADIAN_VALUE,
  RADIUS,
  SLOW_PATTERN_VELOCITY,
} from 'constants/common'
import AnimatedArc from './animated-arc'
import FixedArc from './fixed-arc'
import DepartmentPulses from 'containers/front-page/migratory-map/department-pulses'

const DepartmentMigration = (props) => {
  const { graphs } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const mappedData = useMemo(
    () =>
      map(graphs, (obj) => {
        const startLoc = obj.startLocation
        const endLoc = obj.endLocation
        const lineDistance = distance(startLoc, endLoc)
        const lineBearing = bearing(startLoc, endLoc)
        const curvedPoint = destination(
          startLoc,
          lineDistance / 2 / Math.cos(RADIAN_VALUE),
          lineBearing + RADIUS
        )

        const curvedLine = bezierSpline(
          lineString([startLoc, curvedPoint.geometry.coordinates, endLoc]),
          {
            sharpness: 1,
          }
        )

        return {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: curvedLine.geometry.coordinates,
          },
          properties: {
            officerName: obj.officerName,
            count: obj.count,
          },
        }
      }),
    [graphs]
  )

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (currentIndex < mappedData.length - 1) {
          setCurrentIndex(currentIndex + 1)
        }
      },
      currentIndex < 5 ? SLOW_PATTERN_VELOCITY : FAST_PATTERN_VELOCITY
    )

    return () => {
      clearTimeout(timeout)
    }
  }, [currentIndex, mappedData])

  return (
    <>
      {mappedData.map((line, index) => (
        <AnimatedArc
          key={index}
          line={line}
          currentIndex={currentIndex}
          lineIndex={index}
        />
      ))}
      {mappedData.length > 0 && (
        <FixedArc lines={mappedData} currentIndex={currentIndex} />
      )}
      <DepartmentPulses currentIndex={currentIndex} />
    </>
  )
}

DepartmentMigration.propTypes = {
  graphs: PropTypes.array,
}

DepartmentMigration.defaultProps = {
  graphs: [],
}

export default DepartmentMigration
