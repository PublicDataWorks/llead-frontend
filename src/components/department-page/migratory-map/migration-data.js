import React from 'react'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import { Marker } from 'react-mapbox-gl'

import { createMapCurvedLine } from 'utils/curved-line'
import DepartmentPoints from './department-points'
import RedMarker from 'assets/icons/red-marker.svg'
import FixedArc from 'components/common/map/fixed-arc'

const DepartmentMigrationData = (props) => {
  const { department, graphs, nodes } = props
  const { location } = department
  const mappedData = map(graphs, createMapCurvedLine)

  return (
    <>
      <Marker coordinates={location} anchor='bottom' offset={-4}>
        <img src={RedMarker} />
      </Marker>
      <DepartmentPoints departmentCoordinates={nodes} />
      <FixedArc lines={mappedData} showAll />
    </>
  )
}

DepartmentMigrationData.propTypes = {
  department: PropTypes.object,
  nodes: PropTypes.array,
  graphs: PropTypes.array,
}

DepartmentMigrationData.defaultProps = {
  department: {},
  nodes: [],
  graphs: [],
}

export default DepartmentMigrationData
