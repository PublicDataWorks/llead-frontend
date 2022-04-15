import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import config from 'config'
import { isMobile, isTablet } from 'react-device-detect'

import DepartmentPoints from 'containers/front-page/migratory-map/department-points'
import DepartmentMigration from 'containers/front-page/migratory-map/department-migration'
import MigrationDetailsBox from 'containers/front-page/migratory-map/migration-details'

const MigratoryMap = () => {
  const { mapboxKey } = config

  const Map = ReactMapboxGl({
    accessToken: mapboxKey,
    scrollZoom: false,
    interactive: false,
    attributionControl: false,
  })

  const mapHeight = isMobile ? 500 : isTablet ? 700 : 640

  return (
    <div style={{ position: 'relative' }}>
      <MigrationDetailsBox />
      <Map
        style='mapbox://styles/mapbox/light-v10'
        containerStyle={{ height: `${mapHeight}px` }}
        center={[-91.798844, 31.158971]}
        zoom={[6.6]}
      >
        <DepartmentMigration />
        <DepartmentPoints />
      </Map>
    </div>
  )
}

export default React.memo(MigratoryMap)
