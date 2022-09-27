import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import toUpper from 'lodash/toUpper'

import './migration-details.scss'

const MigrationDetailsBox = (props) => {
  const { migratedOfficer } = props

  const {
    date,
    startDepartment,
    officerName,
    endDepartment,
    leftReason,
  } = migratedOfficer

  return (
    !isEmpty(migratedOfficer) && (
      <div className='migration-details-box'>
        <div className='migration-date'>{date}</div>
        <div className='start-department'>{toUpper(startDepartment)}</div>
        <div className='officer'>
          <div className='line'></div>
          <div
            className={cx('officer', {
              highlighted: !isEmpty(leftReason),
            })}
          >
            <div className='officer-name'>{officerName}</div>
            {!isEmpty(leftReason) && (
              <div className='officer-left-reason'>({leftReason})</div>
            )}
          </div>
        </div>
        <div className='end-department'>{toUpper(endDepartment)}</div>
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
