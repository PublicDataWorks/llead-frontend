import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import config from 'config'

import './department-migratory-map.scss'
import DepartmentMigrationDataContainer from 'containers/department-page/migratory-map/migration-data'
import MigratoryInformationBoxContainer from 'containers/department-page/migratory-map/information-box'
import MapFooterContainer from 'containers/department-page/migratory-map/map-footer'

const DepartmentMigratoryMap = () => {
  const Map = ReactMapboxGl({
    accessToken: config.mapboxKey,
    scrollZoom: false,
    attributionControl: false,
    interactive: false,
    logoPosition: 'bottom-right',
  })
  const mapCenter = [-90.33, 30.75]
  const zoom = 5

  return (
    <div className='department-migratory-map'>
      <MigratoryInformationBoxContainer />
      <Map
        style='mapbox://styles/llead/cl2pmpqb4005p14nybpstbchj'
        center={mapCenter}
        zoom={[zoom]}
      >
        <DepartmentMigrationDataContainer />
      </Map>
      <MapFooterContainer />
    </div>
  )
}

export default React.memo(DepartmentMigratoryMap)
