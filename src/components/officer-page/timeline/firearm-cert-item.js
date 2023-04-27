import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './firearm-cert-item.scss'

const FirearmCertItem = (props) => {
  const { className } = props

  return (
    <div className={cx('timeline-firearm-cert-item', className)}>
      Level 1 Firearms Certification
    </div>
  )
}

FirearmCertItem.propTypes = {
  className: PropTypes.string,
}

FirearmCertItem.defaultProps = {}

export default FirearmCertItem
