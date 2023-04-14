import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { formatDate } from 'utils/formatter'

import './joined-item.scss'

const JoinedEventItem = (props) => {
  const { className, department, leftDepartment, leftDate, leftReason } = props

  return (
    <div className={cx('timeline-joined-item', className)}>
      <div
        className={cx('timeline-joined-item-title', {
          'is-info': !isEmpty(leftDepartment),
        })}
      >
        Joined {department}
      </div>
      <div
        className={cx('timeline-joined-item-info', {
          'is-info': !isEmpty(leftDepartment),
        })}
      >
        <div className='left-department'>
          Left <span>{leftDepartment}</span> on {formatDate(leftDate)}
        </div>
        <div className='left-reason'>
          Left Reason: <span>{leftReason}</span>
        </div>
      </div>
    </div>
  )
}

JoinedEventItem.propTypes = {
  className: PropTypes.string,
  department: PropTypes.string,
  leftDepartment: PropTypes.string,
  leftDate: PropTypes.string,
  leftReason: PropTypes.string,
}

JoinedEventItem.defaultProps = {}

export default JoinedEventItem
