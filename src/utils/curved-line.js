import {
  bezierSpline,
  lineString,
  distance,
  destination,
  bearing,
} from '@turf/turf'

import { RADIAN_VALUE, RADIUS } from 'constants/common'

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
