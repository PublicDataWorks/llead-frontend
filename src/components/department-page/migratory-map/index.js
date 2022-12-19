import React, { useEffect, useMemo } from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import config from 'config'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import './department-migratory-map.scss'
import FixedArc from 'components/common/map/fixed-arc'
import { createMapCurvedLine } from 'utils/curved-line'
import DepartmentPoints from './department-points'
import RedMarker from 'assets/icons/red-marker.svg'
import MigratoryInformationBox from './information-box'

const DepartmentMigratoryMap = (props) => {
  const Map = ReactMapboxGl({
    accessToken: config.mapboxKey,
    scrollZoom: false,
    attributionControl: false,
    interactive: false,
    logoPosition: 'bottom-right',
  })

  const {
    id,
    department,
    nodes,
    graphs,
    information,
    fetchDepartmentMigratoryData,
  } = props

  const { city, address, phone, parish, location } = department

  const mapCenter = [-90.33, 30.75]
  const zoom = 5

  const mappedData = useMemo(() => map(graphs, createMapCurvedLine), [graphs])

  useEffect(() => {
    fetchDepartmentMigratoryData(id)
  }, [])

  return (
    <div className='department-migratory-map'>
      <MigratoryInformationBox migratoryInformation={information} />
      <Map
        style='mapbox://styles/llead/cl2pmpqb4005p14nybpstbchj'
        center={mapCenter}
        zoom={[zoom]}
      >
        <Marker coordinates={location} anchor='bottom' offset={-4}>
          <img src={RedMarker} />
        </Marker>
        <DepartmentPoints departmentCoordinates={nodes} />
        <FixedArc lines={mappedData} showAll />
      </Map>
      <div className='department-location'>
        <div className='upper-location-info'>
          {!isEmpty(city) && <div className='department-city'>{city}</div>}
          {!isEmpty(parish) && (
            <div className='department-parish'>{parish}</div>
          )}
        </div>

        <div className='lower-location-info'>
          {!isEmpty(address) && (
            <div className='department-address'>{address}</div>
          )}
          {!isEmpty(phone) && <div className='department-phone'>{phone}</div>}
        </div>
      </div>
    </div>
  )
}

DepartmentMigratoryMap.propTypes = {
  id: PropTypes.string,
  department: PropTypes.object,
  nodes: PropTypes.array,
  graphs: PropTypes.array,
  fetchDepartmentMigratoryData: PropTypes.func,
  information: PropTypes.object,
}

DepartmentMigratoryMap.defaultProps = {
  department: {},
  nodes: [],
  graphs: [],
  fetchDepartmentMigratoryData: noop,
  information: {},
}

export default React.memo(DepartmentMigratoryMap)
