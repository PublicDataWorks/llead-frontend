import {
  bezierSpline,
  lineString,
  distance,
  destination,
  bearing,
} from '@turf/turf'
import isEmpty from 'lodash/isEmpty'

import {
  MAP_HIGHLIGHTED_LINE_COLOR,
  MAP_LINE_COLOR,
  RADIAN_VALUE,
  RADIUS,
} from 'constants/common'

export const createCurvedLine = (startLocation, endLocation) => {
  const lineDistance = distance(startLocation, endLocation)
  const lineBearing = bearing(startLocation, endLocation)
  const curvedPoint = destination(
    startLocation,
    lineDistance / 2 / Math.cos(RADIAN_VALUE),
    lineBearing + RADIUS
  )

  return bezierSpline(
    lineString([startLocation, curvedPoint.geometry.coordinates, endLocation]),
    {
      sharpness: 1,
    }
  )
}

export const createMapCurvedLine = (obj) => {
  const curvedLine = createCurvedLine(obj.startLocation, obj.endLocation)
  const highlight =
    obj.isLeft || (obj.isLeft !== false && !isEmpty(obj.leftReason))

  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: curvedLine.geometry.coordinates,
    },
    properties: {
      count: obj.count,
      color: highlight ? MAP_HIGHLIGHTED_LINE_COLOR : MAP_LINE_COLOR,
    },
  }
}
