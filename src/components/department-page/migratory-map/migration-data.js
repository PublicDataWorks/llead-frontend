import React from 'react'
import map from 'lodash/map'
import PropTypes from 'prop-types'

import DepartmentPoints from 'containers/department-page/migratory-map/department-marker-points'
import { createMapCurvedLine } from 'utils/curved-line'
import FixedArc from 'components/common/map/fixed-arc'

const DepartmentMigrationData = (props) => {
  const { graphs } = props

  const mappedData = map(graphs, createMapCurvedLine)

  return (
    <>
      <DepartmentPoints />
      <FixedArc lines={mappedData} showAll />
    </>
  )
}

DepartmentMigrationData.propTypes = {
  graphs: PropTypes.array,
}

DepartmentMigrationData.defaultProps = {
  graphs: [],
}

export default DepartmentMigrationData
