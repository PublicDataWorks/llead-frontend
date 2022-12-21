import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import map from 'lodash/map'
import noop from 'lodash/noop'

import './information-table.scss'

const MigratoryInformationTable = (props) => {
  const {
    isLeft,
    isShowing,
    migratoryInformation,
    closeInformationTable,
  } = props

  const { count, departments } = migratoryInformation

  return (
    <div className={cx('migratory-information-table', { showing: isShowing })}>
      <div className={cx('summary', { 'is-left': isLeft })}>
        {isLeft && <div>Officers leaving to join other agencies&nbsp;</div>}
        {!isLeft && <div>Officers joining from other agencies&nbsp;</div>}
        <div className={cx('count-sum', { 'is-left': isLeft })}>{count}</div>
        <div
          className={cx('close-btn', { 'is-left': isLeft })}
          onClick={closeInformationTable}
        />
      </div>
      <div className='title'>
        <div className='migratory-department-title'>
          <div>TOP 5 AGENCIES</div>
          {isLeft && <div>(which officers are migrating to)</div>}
          {!isLeft && <div>(from which officers are migrating)</div>}
        </div>

        <div className='total-title'>TOTAL</div>
      </div>
      {map(departments, (department) => (
        <div className='migratory-department' key={department.name}>
          <div className='name'>{department.name}&nbsp;</div>
          <div className='count'>{department.count}</div>
        </div>
      ))}
    </div>
  )
}

MigratoryInformationTable.propTypes = {
  isLeft: PropTypes.bool,
  isShowing: PropTypes.bool,
  migratoryInformation: PropTypes.object,
  closeInformationTable: PropTypes.func,
}

MigratoryInformationTable.defaultProps = {
  migratoryInformation: {},
  closeInformationTable: noop,
}

export default MigratoryInformationTable
