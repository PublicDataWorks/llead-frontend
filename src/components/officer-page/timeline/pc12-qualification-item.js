import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './pc12-qualification-item.scss'

const PC12QualificationItem = (props) => {
  const { className } = props

  return (
    <div className={cx('timeline-pc12-qualification-item', className)}>
      Last PC-12 Qualification
    </div>
  )
}

PC12QualificationItem.propTypes = {
  className: PropTypes.string,
}

PC12QualificationItem.defaultProps = {}

export default PC12QualificationItem
