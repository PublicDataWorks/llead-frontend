import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './spinner.scss'

const Spinner = (props) => {
  const { className } = props

  return <div className={cx('gradient-spinner', className)} />
}

Spinner.propTypes = {
  className: PropTypes.string,
}

Spinner.defaultProps = {
  className: '',
}

export default Spinner
