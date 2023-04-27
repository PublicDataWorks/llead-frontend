import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import capitalize from 'lodash/capitalize'
import lowerCase from 'lodash/lowerCase'

import './left-item.scss'

const LeftEventItem = (props) => {
  const { kind, className, department } = props

  return (
    <div
      className={cx(
        'timeline-left-item',
        className,
        `timeline-${lowerCase(kind)}-item`
      )}
    >
      {capitalize(kind)} from {department}
    </div>
  )
}

LeftEventItem.propTypes = {
  kind: PropTypes.string,
  className: PropTypes.string,
  department: PropTypes.string,
}

LeftEventItem.defaultProps = {}

export default LeftEventItem
