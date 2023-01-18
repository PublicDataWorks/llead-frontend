import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import compact from 'lodash/compact'
import join from 'lodash/join'

import './unit-change-item.scss'

const UnitChangeItem = (props) => {
  const {
    departmentCode,
    departmentDesc,
    prevDepartmentCode,
    prevDepartmentDesc,
    className,
  } = props

  return (
    <div className={cx('timeline-unit-change-item', className)}>
      <div className={cx('timeline-unit-change-row', className)}>
        Joined&nbsp;
        <span className='timeline-unit-change-value'>
          Unit {join(compact([departmentCode, departmentDesc]), ' - ')}
        </span>
      </div>
      {(prevDepartmentCode || prevDepartmentDesc) && (
        <div className={cx('timeline-unit-change-row', className)}>
          Leave Unit&nbsp;
          {join(compact([prevDepartmentCode, prevDepartmentDesc]), ' - ')}
        </div>
      )}
    </div>
  )
}

UnitChangeItem.propTypes = {
  className: PropTypes.string,
  departmentCode: PropTypes.string,
  departmentDesc: PropTypes.string,
  prevDepartmentCode: PropTypes.string,
  prevDepartmentDesc: PropTypes.string,
}

export default UnitChangeItem
