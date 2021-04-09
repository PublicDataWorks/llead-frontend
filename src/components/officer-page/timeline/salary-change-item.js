import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './change-item.scss'

const SalaryChangeItem = (props) => {
  const { annualSalary, className } = props

  return (
    <div className={cx('timeline-change-item', className)}>
      Salary changed to
      <span className='change-item-value'> ${annualSalary}/yr</span>
    </div>
  )
}

SalaryChangeItem.propTypes = {
  className: PropTypes.string,
  annualSalary: PropTypes.string,
}

SalaryChangeItem.defaultProps = {}

export default SalaryChangeItem
