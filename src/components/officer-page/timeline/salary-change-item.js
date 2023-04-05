import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './change-item.scss'

const SalaryChangeItem = (props) => {
  const { salary, className } = props

  return (
    <div
      className={cx('timeline-change-item', 'salary-change-item', className)}
    >
      Salary changed to
      <span className='change-item-value'> {salary}</span>
    </div>
  )
}

SalaryChangeItem.propTypes = {
  className: PropTypes.string,
  salary: PropTypes.string,
}

export default SalaryChangeItem
