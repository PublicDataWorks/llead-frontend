import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './salary-change-item.scss'

const SalaryChangeItem = (props) => {
  const { annualSalary, className } = props

  return (
    <div className={cx('timeline-salary-change-item', className)}>
      Salary changed to
      <span className='salary-value'> ${annualSalary}/yr</span>
    </div>
  )
}

SalaryChangeItem.propTypes = {
  className: PropTypes.string,
  annualSalary: PropTypes.string,
}

SalaryChangeItem.defaultProps = {}

export default SalaryChangeItem
