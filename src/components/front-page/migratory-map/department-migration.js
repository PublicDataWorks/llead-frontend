import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import noop from 'lodash/noop'

import './department-migration.scss'
import { MAP_BASE_INTERVAL } from 'constants/common'
import AnimatedArc from './animated-arc'
import FixedArc from './fixed-arc'
import DepartmentPulses from 'containers/front-page/migratory-map/department-pulses'
import { createCurvedLine } from 'utils/curved-line'

const DepartmentMigration = (props) => {
  const { graphs, setMapCurrentIndex } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  const mappedData = useMemo(
    () =>
      map(graphs, (obj) => {
        const curvedLine = createCurvedLine(obj.startLocation, obj.endLocation)

        return {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: curvedLine.geometry.coordinates,
          },
          properties: {
            count: obj.count,
          },
        }
      }),
    [graphs]
  )

  useEffect(() => {
    const interval =
      currentIndex < 5
        ? MAP_BASE_INTERVAL
        : MAP_BASE_INTERVAL / (Math.log(currentIndex) + 1)

    const timeout = setTimeout(() => {
      if (currentIndex < mappedData.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setMapCurrentIndex(currentIndex + 1)
      }
    }, interval)

    return () => {
      clearTimeout(timeout)
    }
  }, [currentIndex, mappedData])

  const handleReplayButton = () => {
    setCurrentIndex(0)
    setMapCurrentIndex(0)
  }

  return (
    <>
      <button className='replay-button' onClick={handleReplayButton} />
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
  setMapCurrentIndex: PropTypes.func,
}

DepartmentMigration.defaultProps = {
  graphs: [],
  setMapCurrentIndex: noop,
}

export default DepartmentMigration
