import React from 'react'
import ReactMapboxGl, { RotationControl, ZoomControl } from 'react-mapbox-gl'
import config from 'config'
import { isMobile, isTablet, isDesktop } from 'react-device-detect'

import './migratory-map.scss'
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
    logoPosition: 'bottom-right',
  })

  const mapCenter = isMobile
    ? [-91.798844, 30.758971]
    : isTablet
    ? [-91.798844, 31.158971]
    : [-90.798844, 31.158971]
  const zoom = isMobile ? 5.8 : 6.6

  return (
    <div className='migratory-map'>
      <MigrationDetailsBox />
      <Map
        style='mapbox://styles/llead/cl2pmpqb4005p14nybpstbchj'
        center={mapCenter}
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
