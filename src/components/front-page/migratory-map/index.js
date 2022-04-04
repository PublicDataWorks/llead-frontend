import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import config from 'config'
import { isMobile, isTablet } from 'react-device-detect'

import './migratory-map.scss'
import DepartmentPoints from 'containers/front-page/migratory-map/department-points'
import DepartmentMigration from 'containers/front-page/migratory-map/department-migration'

const MigratoryMap = () => {
  const { mapboxKey } = config

  const Map = ReactMapboxGl({
    accessToken: mapboxKey,
  })

  const mapHeight = isMobile ? 500 : isTablet ? 746 : 930

  return (
    <Map
      style='mapbox://styles/mapbox/light-v10'
      containerStyle={{ height: `${mapHeight}px` }}
      center={[-91.798844, 31.158971]}
      zoom={[7.1]}
    >
      <DepartmentMigration />
      <DepartmentPoints />
    </Map>
  )
}

export default React.memo(MigratoryMap)
