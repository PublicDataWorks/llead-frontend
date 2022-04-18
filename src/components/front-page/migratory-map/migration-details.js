import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import toUpper from 'lodash/toUpper'

import './migration-details.scss'

const MigrationDetailsBox = (props) => {
  const { migratedOfficer } = props

  return (
    !isEmpty(migratedOfficer) && (
      <div className='migration-details-box'>
        <div className='migration-date'>{migratedOfficer.date}</div>
        <div className='start-department'>
          {toUpper(migratedOfficer.startDepartment)}
        </div>
        <div className='officer'>
          <div className='line'></div>
          <div className='officer-name'>{migratedOfficer.officerName}</div>
        </div>
        <div className='end-department'>
          {toUpper(migratedOfficer.endDepartment)}
        </div>
      </div>
    )
  )
}

MigrationDetailsBox.propTypes = {
  migratedOfficer: PropTypes.object,
}

MigrationDetailsBox.defaultProps = {
  migratedOfficer: {},
}

export default MigrationDetailsBox
