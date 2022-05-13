import React from 'react'
import ReactMapboxGl, { RotationControl, ZoomControl } from 'react-mapbox-gl'
import config from 'config'
import { isMobile, isTablet, isDesktop } from 'react-device-detect'

import DepartmentPoints from 'containers/front-page/migratory-map/department-points'
import DepartmentMigration from 'containers/front-page/migratory-map/department-migration'
import MigrationDetailsBox from 'containers/front-page/migratory-map/migration-details'

const MigratoryMap = () => {
  const { mapboxKey } = config

  const Map = ReactMapboxGl({
    accessToken: mapboxKey,
    scrollZoom: false,
    attributionControl: false,
    interactive: isDesktop,
  })

  const mapHeight = isMobile ? 500 : isTablet ? 700 : 640
  const zoom = isMobile ? 5.8 : 6.6

  return (
    <div style={{ position: 'relative' }}>
      <MigrationDetailsBox />
      <Map
        style='mapbox://styles/llead/cl2pmpqb4005p14nybpstbchj'
        containerStyle={{ height: `${mapHeight}px` }}
        center={[-91.798844, 31.158971]}
        zoom={[zoom]}
      >
        <DepartmentMigration />
        <DepartmentPoints />
        <ZoomControl position='top-left' />
        <RotationControl position='top-left' style={{ borderTopWidth: 0 }} />
      </Map>
    </div>
  )
}

export default React.memo(MigratoryMap)
